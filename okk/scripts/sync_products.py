#!/usr/bin/env python3
"""Fetch the public Shopify products JSON and produce products.json for GitHub Pages."""
import json, os, sys, time, urllib.parse, urllib.request
from datetime import datetime, timezone

BASE_URL = os.environ.get('SHOPIFY_PRODUCTS_URL', 'https://decorconcept.az/products.json')
PAGE_SIZE = int(os.environ.get('SHOPIFY_PAGE_SIZE', '250'))
MAX_PAGES = int(os.environ.get('SHOPIFY_MAX_PAGES', '30'))
USER_AGENT = 'DecorConceptCatalogSync/1.0 (+GitHub Pages scheduled catalog refresh)'

def fetch_page(page):
    separator = '&' if '?' in BASE_URL else '?'
    url = f'{BASE_URL}{separator}limit={PAGE_SIZE}&page={page}'
    req = urllib.request.Request(url, headers={'User-Agent': USER_AGENT, 'Accept': 'application/json'})
    with urllib.request.urlopen(req, timeout=45) as response:
        if response.status != 200:
            raise RuntimeError(f'HTTP {response.status} for {url}')
        data = json.loads(response.read().decode('utf-8-sig'))
    if isinstance(data, list): return data
    if isinstance(data, dict) and isinstance(data.get('products'), list): return data['products']
    raise RuntimeError(f'Unexpected JSON format on page {page}')

def main():
    products_by_id = {}
    successful_pages = 0
    for page in range(1, MAX_PAGES + 1):
        products = fetch_page(page)
        successful_pages += 1
        if not products:
            break
        for product in products:
            key = str(product.get('id') or product.get('handle') or '')
            if key:
                products_by_id[key] = product
        print(f'Page {page}: {len(products)} products (unique total: {len(products_by_id)})')
        if len(products) < PAGE_SIZE:
            break
        time.sleep(0.25)
    if not products_by_id:
        raise RuntimeError('No products received; refusing to overwrite catalogue with an empty list.')
    # Only products with a usable image are shown in the catalogue, per store preference.
    products = [p for p in products_by_id.values() if any((im or {}).get('src') for im in (p.get('images') or []))]
    products.sort(key=lambda p: (p.get('title') or '').casefold())
    output = {
        'source': BASE_URL,
        'generated_at': datetime.now(timezone.utc).isoformat(),
        'products_count': len(products),
        'products': products,
    }
    os.makedirs('.', exist_ok=True)
    with open('products.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, separators=(',', ':'))
    print(f'Wrote products.json: {len(products)} products with images from {successful_pages} page(s).')

if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        sys.exit(1)
