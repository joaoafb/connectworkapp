const searchInput = document.getElementById('searchInput');
const tablelist = document.getElementById('mostrartarefas');

searchInput.addEventListener('input', function() {
  const searchValue = searchInput.value.toLowerCase();
  const rows = tablelist.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const name = rows[i].getElementsByTagName('td')[1];
    if (name) {
      const nameText = name.textContent.toLowerCase();
      const shouldDisplay = nameText.includes(searchValue);
      rows[i].style.display = shouldDisplay ? '' : 'none';
    }
  }
});
