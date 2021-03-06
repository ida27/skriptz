//
// KEYS
//
function addKey(key, keys=null) {
  if(keys === null) {
    keys = getKeys()
  }
  if(localStorage.getItem(key) === null) {
    var delisAmount = getRowDelisAmount()
    var vals = key + cellDeli.repeat(delisAmount)
    if(keys === null) {
      keys = getKeys()
    }
    keys.push(key)
    localStorage.setItem(key, vals)
    showTable(keys)
  }
  return keys
}
function delKey(key) {
  localStorage.removeItem(key)
  showTable()
}
function editKey(oldKey, newKey) {
  var vals = localStorage.getItem(oldKey)
  vals = vals.split(cellDeli)
  vals[0] = newKey
  vals = vals.join(cellDeli)
  localStorage.removeItem(oldKey)
  localStorage.setItem(newKey, vals)
}
function getKeys() {
  var keys = []
  for(var i in localStorage) {
    if(typeof(localStorage[i]) == 'string') {
      keys.push(localStorage[i].split(cellDeli)[0])
    }
  }
  return keys
}
//
// TABLE
//
function getTable(keys) {
  var csv = ''
  for(var i in keys) {
    csv += localStorage.getItem(keys[i]) + columnDeli
  }
  if(csv != '') {
    csv = csv.slice(0, -columnDeli.length)
  }
  return csv
}
function setTable(csv) {
  localStorage.clear()
  var rows = []
  var columns = csv.split(columnDeli)
  for(var i in columns) {
    var cells = columns[i].split(cellDeli)
    for(var j in cells) {
      if(j == rows.length) {
        rows.push([])
      }
      rows[j][i] = cells[j]
    }
  }
  for(var i in rows) {
    var key = rows[i][0]
    var val = rows[i].join(cellDeli)
    localStorage.setItem(key, val)
  }
}
function showTable(keys=null) {

  var html = ''

  if(keys === null) { keys = getKeys() }
  var table = getTable(keys)
  var rows = table.split(columnDeli)

  if(keys.length == 0) {
    html += "<p>There's no data, yet. Click the plus-button, to enter the \
            first column-header.</p>"
  }

  html += '<div>' // table-wrapper

  // Add first column, add-col-button and row-nrs:
  html += '<div>'
    html += '<div class="info">'
      html += '<span class="button" style="z-index:2;position:relative;top:0;\
              left:0">i</span>'
      html += '<div class="text" style="z-index:1;display:none;position:\
              absolute;top:0;left:0;width:99%;height:99%;background:#f2f2f2">'
        html += '<h2>'
        html += 'Browser-based spreadsheet'
        html += '</h2>'
        html += '<p>'
        html += "This app shows your browser's local storage as a spreadsheet \
                and stores any modification you do immediately to the local \
                storage. You can close your browser and come back another \
                time, the data will still be there."
        html += '</p>'
        html += '<p>'
        html += 'The first row is for entering a new entry, if you hit the \
                 Enter-/Return-key in any cell of it, the new row is appended \
                 to the table. Hover over the grey buttons to get a \
                 description of what they do.'
        html += '</p>'
        html += '<h3>'
        html += 'Note'
        html += '</h3>'
        html += '<p>'
        html += 'This is a not entirely finished prototype, meaning currently \
                you cannot use commas within a cell.'
        html += '</p>'
        html += '<p>'
        html += 'For more details, see the '
        html += '<a href="README.txt" title="More about this app">README</a> '
        html += 'of this app.'
        html += '</p>'
        html += '<hr>'
        html += '<p style="font-size:70%">'
        html += 'This is a copy of '
        html += '<a href="https://github.com/ida/skriptz/tree/master/js/localStorage"\
                  title="Go to the repository of this app">'
        html += 'https://github.com/ida/skriptz/tree/master/js/localStorage</a>.'
        html += '</p>'
      html += '</div>'
    html += '</div>'
    html += '<div class="addKey" title="Add column" tabindex="1">'
    html += '<span class="button">+</span>'
    html += '</div>'
  if(table != '') {
    var cells = rows[0].split(cellDeli)
    for(var j in cells) {
      if(j != 0) {
        html += '<div>'
          if(j == 1) {
            html += '<span class="rowUp dummy">'
              html += '&nbsp;'
            html += '</span>'
          }
          else {
            html += '<span class="rowUp button" title="Move row up">'
              html += '^'
            html += '</span>'
          }
          html += j
          if(j == cells.length -1) {
            html += '&nbsp;' // dummy
          }
          else {
            html += '<span class="rowDown button" title="Move row down">'
              html += 'v'
            html += '</span>'
          }
        html += '</div>'
      }
    }
  }
  html += '</div>'

  if(table != '') {
  // Add columns:
  for(var i in rows) {
    html += '<div>'
    var row = rows[i]
    var cells = row.split(cellDeli)
    for(var j in cells) {
      if(j == 0) {
        // New-row-cell, including move-column-buttons:
        html += '<div>'
        if(i == 0) {
          html += '<span>&nbsp;</span>'
        }
        else {
          html += '<span class="columnToLeft button" title="Move column to left"><</span>'
        }
        html += '<input tabindex="1">'
        if(i == rows.length-1) {
          html += '<span>&nbsp;</span>'
        }
        else {
          html += '<span class="columnToRight button" title="Move column to right">></span>'
        }
        html += '</div>'
        html += '<div class="columnHeaderCell editCell" tabindex="'
                + j + 2 + '">'
      }
      else { // except keys
        html += '<div class="editCell" tabindex="' + j + 2 + '">'
      }
      html += cells[j]
      html += '</div>'
    }
    html += '</div>'
  }

  // Add last column, delete-buttons:
  html += '<div>'
    html += '<div class="delTable button" title="Remove table">'
    html += 'X'
    html += '</div>'
    html += '<div class="delKey button" title="Remove column" tabindex="0">'
    html += 'X'
    html += '</div>'
    html += '<div class="delRow button" title="Remove row" tabindex="0">X</div>'
    .repeat(getRowDelisAmount())
  html += '</div>'  // end of last-column
  } // table != ''
  html += '</div>' //  end of table

  // Set html:
  document.getElementsByTagName('body')[0].innerHTML = html
  // Re-apply listeners to new html:
  addListeners(keys)
  // If table has content:
  if(document.getElementsByTagName('input').length > 0) {
    // Focus first input:
    document.getElementsByTagName('input')[0].focus()
  }
  // If table has no content:
  else {
    // Click the add-column-button:
    document.getElementsByClassName('addKey')[0].click()
  }
}
//
// COLUMN
//
function getColKey(cellEle) {
  var colKey = null
  cellEle = cellEle.parentNode.parentNode
  cellEle = getFirstChild(cellEle)
  cellEle = getNextSibling(cellEle)
  if(cellEle.childNodes.length > 0
    && cellEle.childNodes[0].tagName !== undefined
    && cellEle.childNodes[0].tagName.toLowerCase() == 'input') {
    colKey = cellEle.childNodes[0].value
  }
  else {
    colKey = cellEle.innerHTML
  }
  return colKey
}
//
// ROW
//
function addRow(csv, keys=null) {
  if(keys === null) {
    keys = getKeys()
  }
  var vals = csv.split(cellDeli)
  for(var i in keys) {
    var key = keys[i]
    if(localStorage.getItem(key) === null) {
      addKey(key, keys)
    }
    var oldVals = localStorage.getItem(key)
    var newVals = oldVals + cellDeli + vals[i]
    localStorage.setItem(key, newVals)
  }
  showTable(keys)
}
function getRowDelisAmount() {
  var amount = 0
  var keys = getKeys()
  if(keys[0] !== undefined &&
     localStorage.getItem(keys[0]) !== null) {
    amount = localStorage.getItem([keys[0]]).split(cellDeli).length - 1
  }
  return amount
}
function getRowNr(cellEle) {
  var rowNr = 0
  var previousEle = cellEle
  while(previousEle !== null) {
    previousEle = previousEle.previousSibling
    if(previousEle !== null) {
      while (previousEle.nodeType != 1) {
        previousEle = previousEle.previousSibling
      }
    }
    rowNr +=1
  }
  rowNr -= 2 // subtract first two cells: input and column-header
  return rowNr
}
function delRow(pos, keys=null) {
  var vals = ''
  if(keys === null) {
    keys = getKeys()
  }
  for(var i in keys) {
    vals = localStorage.getItem(keys[i])
    vals = vals.split(cellDeli)
    vals.splice(pos, 1)
    vals = vals.join(cellDeli)
    localStorage.setItem(keys[i], vals)
  }
    vals = localStorage.getItem(keys[0])
    vals = vals.split(cellDeli)
    vals.splice(pos, 1)
    vals = vals.join(cellDeli)
}
function moveRow(pos, direction, keys=null) {
  if(keys === null) {
    keys = getKeys()
  }
  for(var i in keys) {
    var vals = localStorage.getItem(keys[i])
    vals = vals.split(cellDeli)
    if(direction == 'down') {
      vals = moveArrayItemToRight(vals, vals[pos])
    }
    else {
      vals = moveArrayItemToLeft(vals, vals[pos])
    }
    vals = vals.join(cellDeli)
    localStorage.setItem(keys[i], vals)
    showTable(keys)
  }
}
//
// LISTEN
//
function addButtonsListener(keys) {
  var addKeyButton = document.getElementsByClassName('addKey')[0]
  var columnToLeftButtons = document.getElementsByClassName('columnToLeft')
  var columnToRightButtons = document.getElementsByClassName('columnToRight')
  var editCellButtons = document.getElementsByClassName('editCell')
  var delKeyButton = document.getElementsByClassName('delKey')[0]
  var delRowButtons = document.getElementsByClassName('delRow')
  var delTableButton = document.getElementsByClassName('delTable')[0]
  var infoButton = document.getElementsByClassName('info')[0].getElementsByClassName('button')[0]
  var rowDownButtons = document.getElementsByClassName('rowDown')
  var rowUpButtons = document.getElementsByClassName('rowUp')
  infoButton.onclick  = function(eve) {
    if(eve.target.nextSibling.style.display == 'none') {
      eve.target.nextSibling.style.display = 'block'
      eve.target.style.position = 'absolute'
      eve.target.textContent = 'X'
    } else {
      eve.target.nextSibling.style.display = 'none'
      eve.target.style.position = 'relative'
      eve.target.textContent = 'i'
    }
  }
  for(var i in rowDownButtons) {
    rowDownButtons[i].onclick = function(eve) {
      // Get rowNr, subtract the first row for new cells:
      var rowNr = getPosInParent(eve.target.parentNode) - 1
      moveRow(rowNr, 'down', keys)
    }
  }
  for(var i in rowUpButtons) {
    rowUpButtons[i].onclick = function(eve) {
      // Get rowNr, subtract the first row for new cells:
      var rowNr = getPosInParent(eve.target.parentNode) - 1
      moveRow(rowNr, 'up', keys)
    }
  }
  for(var i in columnToRightButtons) {
    columnToRightButtons[i].onclick = function(eve) {
      moveColumn(keys, eve.target, 'right')
    }
  }
  for(var i in columnToLeftButtons) {
    columnToLeftButtons[i].onclick = function(eve) {
      moveColumn(keys, eve.target, 'left')
    }
  }
  addKeyButton.onclick = function(eve) {
      addKeyButton.innerHTML = '<input>'
      var addKeyInput = addKeyButton.getElementsByTagName('input')[0]
      addKeyInput.focus()
      addKeyInput.onkeydown = function(eve) {
        if(eve.keyCode == 13) {
          keys = addKey(addKeyInput.value, keys)
        }
      }
  }
  addKeyButton.onkeydown = function(eve) {
    if(eve.keyCode == 13) {
      eve.target.click()
    }
  }
  for(var i in editCellButtons) {
    editCellButtons[i].onclick = function(eve) {
      var hasInput = true
      var tag = eve.target
      var tagName = eve.target.tagName.toLowerCase()
      // First check if there is an input already:
      if(tagName != 'input') {
        if(tag.childNodes.length > 0 && tag.childNodes[0].type != 'text') {
          hasInput = false
        }
        else {
          hasInput = false
        }
      }
      else {
        hasInput = false
      }
      // If not, insert input:
      if(!hasInput) { 
        var tagText = tag.innerHTML
        tag.innerHTML = '<input value="' + eve.target.innerHTML  +
                        '" tabindex="' + tag.getAttribute('tabindex') + '">'
        var input = tag.getElementsByTagName('input')[0]
        input.focus()
        // Key pressed in input:
        input.onkeydown = function(eve) {
          if(eve.keyCode == 13) {
            saveCell(eve.target, tagText)
            tag.innerHTML = eve.target.value
            tag.focus()
          }
        }
        // Input looses focus:
        input.onblur = function(eve) {
          saveCell(eve.target, tagText)
          tag.innerHTML = eve.target.value
        } // input blur
      } // not hasInput
    } // click  button
    // When a user hits enter in a focused cell...
    editCellButtons[i].onkeydown = function(eve) {
      // ... simulate a click to trigger the click-procedure:
      if(eve.keyCode == 13) {
        eve.target.click()
      }
    }
    // When a cell gets focus, simulate a click, too:
    editCellButtons[i].onfocus = function(eve) {
      eve.target.click()
    }
  } // for each editButton
  if(delKeyButton !== undefined) {
    delKeyButton.onclick = function(eve) {
      delKeyButton.innerHTML = '<input>'
      var delKeyInput = delKeyButton.getElementsByTagName('input')[0]
      delKeyInput.focus()
      delKeyInput.onkeydown = function(eve) {
        if(eve.keyCode == 13) {
          delKey(delKeyInput.value)
        }
      }
    }
    delKeyButton.onkeydown = function(eve) {
      if(eve.keyCode == 13) {
        eve.target.click()
      }
    }
    for(var i in delRowButtons) {
      delRowButtons[i].onclick = function(eve) {
        var pos = getRowNr(eve.target)
        delRow(pos)
        showTable(keys)
      }
      delRowButtons[i].onkeydown = function(eve) {
        if(eve.keyCode == 13) {
          eve.target.click()
        }
      }
    }
    delTableButton.onclick = function(eve) {
      if(confirm('Do you really want to delete everything?')) {
        localStorage.clear()
        showTable()
      }
    }
    delTableButton.onkeydown = function(eve) {
      if(eve.keyCode == 13) {
        eve.target.click()
      }
    }
  } // delKeyButton != undefined
}
function saveCell(editCellInputEle, oldKey=null) {
  var rowNr = getRowNr(editCellInputEle.parentNode)
  if(rowNr == 0) { // is column-header
    editKey(oldKey, editCellInputEle.value)
  }
  else { // is ordinary-cell
    var colKey = getColKey(editCellInputEle)
    var val = editCellInputEle.value
    var vals = localStorage.getItem(colKey).split(cellDeli)
    vals[rowNr] = val
    vals = vals.join(cellDeli)
    localStorage.setItem(colKey, vals)
  }
}
function addInputsListener(keys) {
  var inputs = document.getElementsByTagName('input')
  for(var i in inputs) {
    var input = inputs[i]
    input.onkeydown = function(eve) {
      if(eve.keyCode == 13) {
        var vals = ''
        for(var j in inputs) {
          if(typeof(inputs[j]) == 'object') {
            vals += inputs[j].value + cellDeli
          }
        }
        vals = vals.slice(0, -cellDeli.length)
        addRow(vals, keys)
      }
    }
  }
}
function getPosInParent(ele) {
  var pos = 0
  while(ele.previousSibling !== null) {
    if(ele.previousSibling === null) { break }
    ele = ele.previousSibling
    pos += 1
  }
  return pos
}
function cursorIsAtBeginning(input) {
  if(input.selectionStart == 0
    && input.selectionEnd == 0) {
    return true
  }
  else {
    return false
  }
}
function cursorIsAtEnd(input) {
  if(input.selectionStart == input.value.length
    && input.selectionEnd == input.value.length) {
    return true
  }
  else {
    return false
  }
}
function addArrowKeysListener() {
  document.body.onkeydown = function(eve) {
    if(eve.keyCode == 37
    || eve.keyCode == 38
    || eve.keyCode == 39
    || eve.keyCode == 40) {
     var isInput = false 
     var currentEle = document.activeElement

      // If we're in an input, go one up, into cell:
      if(currentEle.tagName.toLowerCase() == 'input') {
        var isInput = true
        var atStart = cursorIsAtBeginning(currentEle)
        var atEnd = cursorIsAtEnd(currentEle)
        currentEle = currentEle.parentNode
      }

      // Arrow-left or arrow-right was pressed:
      if(eve.keyCode == 37 || eve.keyCode == 39) { 

        var pos = getPosInParent(currentEle)

        // First, grab parent:
        currentEle = currentEle.parentNode

        // Arrow-left was pressed:
        if(eve.keyCode == 37) {
          // Get previous uncle:
          if(currentEle.previousSibling !== null) {
            currentEle = currentEle.previousSibling
          }
        }

        // Arrow-right was pressed:
        if(eve.keyCode == 39) {

          // Get next uncle:
          if(currentEle.nextSibling !== null) {
            currentEle = currentEle.nextSibling
          }
        }

        // Now, get cousin of same position:
        currentEle = currentEle.childNodes[pos]

        if(! isInput
        || eve.keyCode == 37 && atStart
        || eve.keyCode == 39 && atEnd) {
          eve.preventDefault() // Inhibit right move before...
          currentEle.focus() // ...focusing new ele.
        }
      }

      // Arrow-up was pressed:
      else if(eve.keyCode == 38) {
        if(currentEle.previousSibling != null) {
          currentEle.previousSibling.focus()
        }
      }

      // Arrow-down was pressed:
      else if(eve.keyCode == 40) {
        if(currentEle.nextSibling != null) {
          currentEle.nextSibling.focus()
        }
      }
    }
  }
}
function moveArrayItemToLeft(arr, item, steps=1) {
  while(steps > 0) {
    steps -= 1
    var pos = arr.indexOf(item) // TODO: regard dups
    arr.splice(pos, 1) // remove item of pos
    arr.splice(pos - 1, 0, item) // add to pos-1
  }
  return arr
}
function moveArrayItemToRight(arr, item, steps=1) {
  while(steps > 0) {
    steps -= 1
    var pos = arr.indexOf(item) // TODO: regard dups
    arr.splice(pos, 1) // remove item of pos
    arr.splice(pos + 1, 0, item) // add item to pos+1
  }
  return arr
}
function moveColumn(keys, button, direction) {
    var colKey = button.parentNode.parentNode
                 .getElementsByClassName('columnHeaderCell')[0]
                 .innerHTML
    if(direction == 'right') {
      moveArrayItemToRight(keys, colKey, 1)
    }
    else if(direction == 'left') {
      moveArrayItemToLeft(keys, colKey, 1)
    }
    showTable(keys)
}
function addListeners(keys) {
  addButtonsListener(keys)
  addInputsListener(keys)
  addArrowKeysListener(keys)
}
