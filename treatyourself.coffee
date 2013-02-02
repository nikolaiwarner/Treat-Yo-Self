# Any wishlist
# http://www.amazon.com/registry/wishlist/#{wishlist_id}/?reveal=unpurchased&sort=date-added&layout=compact

# Current user wishlist
# http://www.amazon.com/gp/registry/wishlist/ref=wish_list?reveal=unpurchased&sort=date-added&layout=compact


class TreatYourself
  constructor: (options={}) ->
    @buy_mode = options.buy_mode || 'random'

    if options.is_background
      # We're the extension button running in the background.
      chrome.browserAction.onClicked.addListener (tab) =>
        console.log 'Treat Yo Self!'
        if window.confirm('Treat yo self?')
          @go_and_treat_yourself()
    else
      # We're on the amazon page itself.
      @fetch_list()


  go_and_treat_yourself: =>
    iframe = document.body.appendChild(document.createElement('iframe'))
    iframe.src = "http://www.amazon.com/gp/registry/wishlist/ref=wish_list?reveal=unpurchased&sort=date-added&layout=compact"


  fetch_list: =>
    buy_buttons = jQuery('.compact-items .tiny input[type=image]')

    if buy_buttons.length > 0
      index_to_buy = 0
      if @buy_mode == 'random'
        index_to_buy = Math.floor(Math.random() * buy_buttons.length)
      if @buy_mode == 'last'
        index_to_buy = buy_buttons.length - 1

      @buy jQuery(buy_buttons[index_to_buy])
    else
      alert "There are no one-click items on your wishlist currently. Add more items to your wishlist then treat yo self!"


  buy: ($item_button) =>
    title = $item_button.parents('.itemWrapper').find('.productTitle a').text()
    alert "You just treated yo self with #{title}!"
    $item_button.click()



if window && window.jQuery
  if window.location != window.parent.location
    jQuery ->
      treatYourself = new TreatYourself()
else
  treatYourself = new TreatYourself
    is_background: true

