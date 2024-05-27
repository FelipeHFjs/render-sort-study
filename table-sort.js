const btn = document.getElementById('btn-add')
const theTable = document.getElementById('the-table')

let id = 6

btn.addEventListener('click', addRecords)

function addRecords() {
    for (let i = 0; i < 1000; i++) {
        const createChild = document.createElement('tr')
        createChild.innerHTML = `<td>${id}</td><td>text ${id}</td>`
        theTable.getElementsByTagName('tbody')[0].appendChild(createChild)
        id++
    }
}

let sortDirection = {} 

function sortTable(tableID, columnIndex, isNumeric) {

    const table = document.getElementById(tableID)
    const tbody = table.getElementsByTagName('tbody')[0]
    const rows = Array.from(tbody.rows)

    if (!sortDirection[tableID]) {
        sortDirection[tableID] = {}
    }
    const direction = sortDirection[tableID][columnIndex] || "asc" 

    rows.sort((rowA, rowB) => {
        let x = rowA.cells[columnIndex].innerHTML.toLowerCase()
        let y = rowB.cells[columnIndex].innerHTML.toLowerCase()
        if (isNumeric) {
            x = parseFloat(x)
            y = parseFloat(y)
        }
        if (direction === "asc") {
            return (x > y) ? 1 : (x < y) ? -1 : 0
        } else {
            return (x < y) ? 1 : (x > y) ? -1 : 0
        }
    })

    rows.forEach(row => tbody.appendChild(row))

    const thElements = table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].querySelectorAll('th')
    thElements.forEach(tcolumn => {
        tcolumn.classList.remove('asc', 'desc')
    })

    table.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[columnIndex].classList.add(direction)
    
    sortDirection[tableID][columnIndex] = direction === "asc" ? "desc" : "asc" 
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This makes the scrolling smooth
    });
}