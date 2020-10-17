chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  $("body").prepend(
    `<div>${request.minSize} - ${request.maxSize}</div>`
  );
  for (let i = 1; i < parseInt(request.minSize); i++) {
    $(`[name='size'] option:contains(': ${i} Core')`).hide();
    $(`[name='size'] option:contains(': ${i} vCPU')`).hide();
  }
  for (let i = parseInt(request.maxSize) + 1; i <= 416; i++) {
    $(`[name='size'] option:contains(': ${i} Core')`).hide();
    $(`[name='size'] option:contains(': ${i} vCPU')`).hide();
  }
  // for (let i = request.minSize; i <= request.maxSize; i++) {
  //   $(`[name='size'] option:contains(': ${i} Core')`).show();
  //   $(`[name='size'] option:contains(': ${i} vCPU')`).show();
  // }
  //$(`[name='size'] option:contains(': ${request.size} Core')`).hide();
  //$(`[name='size'] option:contains(': ${request.size} vCPU')`).hide();
  $(`[name='size'] option`).each(function () {
    if ($(this).css('display') != 'none') {
      $(this).prop("selected", true);
      return false;
    }
  });
  sendResponse({ fromcontent: "This message is from content.js" });
});
