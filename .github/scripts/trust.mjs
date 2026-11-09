export function deriveTrust(observations, evidence) {
  if (!evidence || evidence.length === 0) return 'unrated';
  const { origins, firstHand } = supportOf(observations, evidence);
  return origins.length >= 2 && firstHand > 0 ? 'strong' : 'weak';
}

export function supportOf(observations, evidence) {
  const cited = new Set(evidence || []);
  const citedObs = (observations || []).filter(o => cited.has(o.id) || cited.has(o.ref));
  const qualifying = citedObs.filter(o => o.provenance_complete === true);
  const origins = [...new Set(qualifying.map(o => String(o.origin_key || '').trim()).filter(Boolean))];
  const firstHand = qualifying.filter(o => o.proximity === 'first_hand').length;
  return { cited: citedObs, qualifying, origins, firstHand };
}

export function deriveConfidence(card, opts = {}) {
  const sources = Array.isArray(card?.sources) ? card.sources : [];
  const keys = new Set(
    sources.map(s => String(s?.publisher_key || '').trim().toLowerCase()).filter(Boolean),
  );
  if (keys.size < 2) return 'unrated';

  const identity = String(card?.identity_key || '').trim().toLowerCase();
  const hasPrimary = identity !== '' && keys.has(identity);

  const CORE = ['offering', 'segment', 'positioning'];
  const gapText = (Array.isArray(card?.gaps) ? card.gaps : []).map(g => String(g || '').toLowerCase());
  const coreGap = opts.coreGapApplies !== false && CORE.some(f =>
    String(card?.[f] || '').trim() === '' || gapText.some(g => g.includes(f)),
  );

  if (keys.size >= 3) return hasPrimary && !coreGap ? 'high' : 'medium';
  return hasPrimary && !coreGap ? 'medium' : 'low';
}

export function ungradableConfidence(card) {
  const out = [];
  const sources = Array.isArray(card?.sources) ? card.sources : [];
  const keyless = sources.filter(s => !String(s?.publisher_key || '').trim());
  if (keyless.length)
    out.push(`${keyless.length} source(s) carry no publisher_key — independence is key equality (§3.2), ` +
      'and counting pages instead of parties is exactly the defect N3-e closed');
  if (!String(card?.identity_key || '').trim())
    out.push('the card carries no identity_key — a primary source is one the participant published ' +
      'itself (§3.3), and without the key nothing can be compared against it');
  return out;
}

export function ungradable(observations) {
  const q = observations.filter(o => o.provenance_complete === true);
  const out = [];
  const keyless = q.filter(o => !String(o.origin_key || '').trim());
  const proximityless = q.filter(o => !String(o.proximity || '').trim());
  if (keyless.length)
    out.push(`${keyless.length} qualifying observation(s) carry no origin_key (${keyless.map(o => o.ref).join(', ')}) — ` +
      'identity is key equality (§4.2), and guessing it from prose is how a weak hypothesis rates strong');
  if (proximityless.length)
    out.push(`${proximityless.length} qualifying observation(s) carry no proximity (${proximityless.map(o => o.ref).join(', ')}) — ` +
      '`strong` requires a witness (§4.3), and without the field the run grades weak everywhere, which looks like a pass');
  return out;
}
