fetch('funds.json',{cache:'no-store'})
  .then(r=>r.json())
  .then(rows=>{
    const tbody=document.querySelector('#tbl tbody');
    rows.forEach((r,i)=>{
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${i+1}</td>
        <td>${r.manager}</td><td>${r.fund_no}</td><td>${r.cat}</td>
        <td>${(r.ret1y*100).toFixed(1)}%</td>
        <td>${(r.ret3y*100).toFixed(1)}%</td>
        <td>${(r.ret5y*100).toFixed(1)}%</td>
        <td>${r.sharpe?.toFixed(2)??'—'}</td>
        <td>${r.std?.toFixed(2)??'—'}</td>
        <td>${(r.demo*100).toFixed(2)}%</td>
        <td>${(r.act*100).toFixed(2)}%</td>
        <td><button data-i="${i}">הסבר</button></td>`;
      tbody.appendChild(tr);
    });
    document.getElementById('stamp').textContent=
      'Updated: '+new Date(rows[0].asof).toLocaleDateString('he-IL');

    document.querySelectorAll('button[data-i]').forEach(btn=>{
      btn.onclick=()=>{const r=rows[btn.dataset.i];
        document.getElementById('pcontent').innerHTML=
          `<h3>${r.manager}</h3><p>${r.explain}</p>`;
        popup.classList.remove('hidden');};
    });
  })
  .catch(()=>document.getElementById('stamp').textContent='Error loading data');
const popup=document.getElementById('popup');
document.getElementById('pclose').onclick=()=>popup.classList.add('hidden');
popup.onclick=e=>{if(e.target===popup)popup.classList.add('hidden');};
