const HEADING = /^#{2,4}[ \t]+(\d+(?:\.\d+)*)[.\s]/gm;

export function canonSections(text) {
  const out = new Set();
  if (typeof text !== 'string') return out;
  for (const m of text.matchAll(HEADING)) out.add(m[1]);
  return out;
}

export function normaliseRef(ref) {
  if (typeof ref !== 'string') return null;
  const s = ref.trim().replace(/^section\s+/i, '').replace(/^§\s*/, '').replace(/[.,;:]+$/, '');
  return /^\d+(\.\d+)*$/.test(s) ? s : null;
}

export function ungradableCitation(ref) {
  if (typeof ref !== 'string' || ref.trim() === '') return 'no citation given';
  if (normaliseRef(ref) === null) return `citation is not a section reference: ${JSON.stringify(ref.trim())}`;
  return null;
}

export function resolveCanonSection(ref, sections) {
  const why = ungradableCitation(ref);
  if (why) return { resolved: false, id: null, reason: why };

  const id = normaliseRef(ref);
  if (sections.has(id)) return { resolved: true, id, reason: 'resolves to a section the canon carries' };

  const seg = id.split('.');
  const parent = seg.length > 1 ? seg.slice(0, -1).join('.') : null;
  return {
    resolved: false,
    id,
    reason: parent && sections.has(parent)
      ? `§${id} does not exist; §${parent} does, and a parent does not license a child`
      : `§${id} does not exist in that body`,
  };
}
