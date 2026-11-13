const fs = require('fs');
const path = require('path');
function pyToIpynb(pyPath) {
  const text = fs.readFileSync(pyPath, 'utf8').replace(/\r\n/g, '\n');
  const blocks = text.split(/^# %% /m).filter(b => b.trim().length > 0);
  const cells = [];
  const toSrc = s => s.split('\n').map((l, i, a) => i < a.length - 1 ? l + '\n' : l);
  for (const block of blocks) {
    const lines = block.split('\n');
    const header = lines[0].trim();
    const body = lines.slice(1);
    if (header.startsWith('[markdown]')) {
      const md = body.map(l => l.startsWith('# ') ? l.slice(2) : (l === '#' ? '' : l)).join('\n').trim();
      cells.push({ cell_type: 'markdown', metadata: {}, source: toSrc(md) });
    } else {
      cells.push({ cell_type: 'markdown', metadata: {}, source: ['### ' + header] });
      cells.push({ cell_type: 'code', execution_count: null, metadata: {}, outputs: [], source: toSrc(body.join('\n').trim()) });
    }
  }
  return { cells, metadata: { kernelspec: { display_name: 'Python 3', language: 'python', name: 'python3' }, language_info: { name: 'python' } }, nbformat: 4, nbformat_minor: 5 };
}
const dir = 'Ml Pipelines/AgriShift_review_bundle/AgriShift_review_bundle';
const map = [
  ['02_build_dataset.py', '02_build_dataset.ipynb', 'Ml Pipelines/Drougth/02_build_dataset_drought_(1)_(1).ipynb', 'agrishift_drought_targets.csv.gz'],
  ['03_diagnostics_and_training.py', '03_diagnostics_and_training.ipynb', 'Ml Pipelines/Drougth/03_diagnostics_and_training_(2) (2).ipynb', 'FEATURE_MODE'],
];
for (const [py, b, w, marker] of map) {
  const js = JSON.stringify(pyToIpynb(path.join(dir, py)), null, 1) + '\n';
  fs.writeFileSync(path.join(dir, b), js, 'utf8');
  fs.writeFileSync(w, js, 'utf8');
  console.log(py, 'synced; contains', marker, '=', js.includes(marker));
}
