chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const largestCpu = 416;
  const largestMem = 11400;
  const minCpu = parseInt(request.minCpu);
  const maxCpu = parseInt(request.maxCpu);
  const minMem = parseInt(request.minMem);
  const maxMem = parseInt(request.maxMem);

  for (let i = 1; i <= largestCpu; i++) {
    $(`[name='size'] option:contains(': ${i} Core')`).show();
    $(`[name='size'] option:contains(': ${i} vCPU')`).show();
  }

  for (let i = 1; i <= largestMem; i++) {
    $(`[name='size'] option:contains(', ${i} GB RAM')`).show();
  }

  switch (request.action) {
    case "limit":
      $("body").prepend(`<div>${request.minCpu} - ${request.maxCpu}</div>`);

      for (let i = 1; i < minCpu; i++) {
        $(`[name='size'] option:contains(': ${i} Core')`).hide();
        $(`[name='size'] option:contains(': ${i} vCPU')`).hide();
      }

      for (let i = maxCpu + 1; i <= largestCpu; i++) {
        $(`[name='size'] option:contains(': ${i} Core')`).hide();
        $(`[name='size'] option:contains(': ${i} vCPU')`).hide();
      }

      for (let i = 0; i < minMem; i++) {
        $(`[name='size'] option:contains(', ${i} GB RAM')`).hide();
      }

      for (let i = maxMem + 1; i <= largestMem; i++) {
        $(`[name='size'] option:contains(', ${i} GB RAM')`).hide();
      }
  }

  $(`[name='size'] option`).each(function () {
    if ($(this).css("display") != "none") {
      $(this).prop("selected", true);
      return false;
    }
  });

  sendResponse({ fromcontent: "This message is from content.js" });
});
