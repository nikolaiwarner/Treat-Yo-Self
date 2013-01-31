var TreatYourself, treatYourself,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

TreatYourself = (function() {

  function TreatYourself(options) {
    var _this = this;
    if (options == null) options = {};
    this.buy = __bind(this.buy, this);
    this.fetch_list = __bind(this.fetch_list, this);
    this.go_and_treat_yourself = __bind(this.go_and_treat_yourself, this);
    this.buy_mode = options.buy_mode || 'random';
    if (options.is_background) {
      chrome.browserAction.onClicked.addListener(function(tab) {
        console.log('Treat Yo Self!');
        return _this.go_and_treat_yourself();
      });
    } else {
      this.fetch_list();
    }
  }

  TreatYourself.prototype.go_and_treat_yourself = function() {
    var iframe;
    iframe = document.body.appendChild(document.createElement('iframe'));
    return iframe.src = "http://www.amazon.com/gp/registry/wishlist/ref=wish_list?reveal=unpurchased&sort=date-added&layout=compact";
  };

  TreatYourself.prototype.fetch_list = function() {
    var buy_buttons, index_to_buy;
    buy_buttons = jQuery('.compact-items .tiny input[type=image]');
    if (buy_buttons.length > 0) {
      index_to_buy = 0;
      if (this.buy_mode === 'random') {
        index_to_buy = Math.floor(Math.random() * buy_buttons.length);
      }
      if (this.buy_mode === 'last') index_to_buy = buy_buttons.length - 1;
      return this.buy(jQuery(buy_buttons[index_to_buy]));
    }
  };

  TreatYourself.prototype.buy = function($item_button) {
    var title;
    title = $item_button.parents('.itemWrapper').find('.productTitle a').text();
    alert("You just treated yo self with " + title + "!");
    return $item_button.click();
  };

  return TreatYourself;

})();

if (window && window.jQuery) {
  if (window.location !== window.parent.location) {
    jQuery(function() {
      var treatYourself;
      return treatYourself = new TreatYourself();
    });
  }
} else {
  treatYourself = new TreatYourself({
    is_background: true
  });
}
