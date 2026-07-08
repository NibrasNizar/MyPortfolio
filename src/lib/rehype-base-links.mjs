// Prefixes root-relative <a href="/..."> links produced by rendered markdown/MDX content
// with the configured base path. Astro's `base` config doesn't touch link URLs written
// inside content prose -- this is the systemic fix so content authors can keep writing
// plain `/projects/slug`-style links without knowing or caring about hosting/base setup.
export default function rehypeBaseLinks(base) {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
    function visit(node) {
      if (node.type === 'element' && node.tagName === 'a' && typeof node.properties?.href === 'string') {
        const href = node.properties.href;
        if (href.startsWith('/') && !href.startsWith('//')) {
          node.properties.href = `${prefix}${href}`;
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
