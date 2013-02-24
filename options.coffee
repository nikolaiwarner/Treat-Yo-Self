save_options = ->
  chrome.storage.sync.set {'value': theValue}, ->
    console.log('Settings saved')

restore_options = ->
  chrome.storage.sync.get 'value'
