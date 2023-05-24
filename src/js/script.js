$(document).ready(function () {
  function init() {
    searchOrders();
    clearSearch();
    deleteOrderAndProducts();
    changeStatus();
  }

  init();

  function searchOrders() {
    $("#search").on("keyup", function () {
      let search = $(this).val(); // Converter o valor da pesquisa para minúsculas

      let order = $(".order-title");

      // Filtrar os pedidos com base no valor da pesquisa
      order.each(function () {
        let orderCode = $(this).attr("data-order"); // Converter o código do pedido para minúsculas
        let sectionDefault = $(this).closest(".section-default");

        if (orderCode.includes(search) || search === "") {
          sectionDefault.show(); // Exibir se o código do pedido contém a pesquisa ou se a pesquisa está vazia
        } else {
          sectionDefault.hide(); // Ocultar se o código do pedido não contém a pesquisa
        }
      });
    });
  }

  function clearSearch() {
    $('input[type="search"]').on("input", function () {
      if ($(this).val() == "") {
        let sectionDefault = $(".section-default");
        sectionDefault.show();
      } else {
        return false;
      }
    });
  }

  function deleteOrderAndProducts() {
    $(".btn-delete").on("click", function () {
      let toDelete = $(this).attr("data-delete");

      if (toDelete == "order") {
        $(this).closest(".section-default").remove();
      } else if (toDelete == "product") {
        $(this).closest(".card-container").remove();
      } else {
        return false;
      }
    });
}

  function changeStatus() {
    $(".btn-status").on("click", function () {
      let parentCard = $(this).closest(".card-container");

      if ($(this).text() == "Pronto") {
        parentCard
          .find(".btn-left")
          .removeClass("btn-active")
          .addClass("btn-disabled");
        parentCard
          .find(".btn-right")
          .removeClass("btn-disabled")
          .addClass("btn-active");
      } else if ($(this).text() == "Em preparo") {
        parentCard
          .find(".btn-right")
          .removeClass("btn-active")
          .addClass("btn-disabled");
        parentCard
          .find(".btn-left")
          .removeClass("btn-disabled")
          .addClass("btn-active");
      } else {
        return false;
      }
    });
  }
});
