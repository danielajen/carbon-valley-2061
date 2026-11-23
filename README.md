# Carbon Valley 2061

Speculative climate fiction for Anthro 2288A, Module 3, Group 1. A map of Kenya's Rift Valley that you drag through time from 2008 to 2061, with five documents left by the people who live there.

## Adding a document

All text lives in `data.js`. To add a member's document, find it in `DOCS` and replace `body: null` with their text as HTML (one `<p>` per paragraph). Then remove its `pending` entry, or set it to `null`, and push.

## Running locally

```
python3 -m http.server 8061
```
