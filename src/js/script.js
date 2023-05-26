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
        let $orderContainer = $(this).closest(".order-container");
        let $sectionDefault = $orderContainer.closest(".section-default");
        $orderContainer.remove();

        if ($sectionDefault.find(".card-container").length === 0) {
          $sectionDefault.remove();
        } else {
          return false;
        }
      } else if (toDelete == "product") {
        let $cardContainer = $(this).closest(".card-container");
        let $productsGrid = $cardContainer.closest(".products-grid");
        $cardContainer.remove();

        if ($productsGrid.find(".card-container").length === 0) {
          let $sectionDefault = $productsGrid.closest(".section-default");
          $sectionDefault.remove();
        } else {
          return false;
        }
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
          .removeClass("btn-preparing-active")
          .addClass("btn-preparing-disabled");
        parentCard
          .find(".btn-right")
          .removeClass("btn-done-disabled")
          .addClass("btn-done-active");
      } else if ($(this).text() == "Em preparo") {
        parentCard
          .find(".btn-right")
          .removeClass("btn-done-active")
          .addClass("btn-done-disabled");
        parentCard
          .find(".btn-left")
          .removeClass("btn-preparing-disabled")
          .addClass("btn-preparing-active");
      } else {
        return false;
      }
    });
  }
});
