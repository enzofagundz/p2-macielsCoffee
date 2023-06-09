$(document).ready(function () {
  //Definir constanstes da API

  const API_URL_GET_ORDERS = "https://www.fateclins.edu.br/felipeMaciel/api/macieulsCoffee/pedidos.php?token=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  const API_URL_UPDATE = "https://www.fateclins.edu.br/felipeMaciel/api/macieulsCoffee/item.php?token=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  const API_URL_DELETE_ORDER = "https://www.fateclins.edu.br/felipeMaciel/api/macieulsCoffee/pedido.php?token=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  const API_URL_DELETE_PRODUCT = "https://www.fateclins.edu.br/felipeMaciel/api/macieulsCoffee/item.php?token=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  // Funcão para inicializar o script

  function init() {
    searchOrderAndProducts();
    changeStatus();
    ordersMenu();
    deleteOrder();
    deleteProduct();
  }

  init();

  //Função para setar o card conforme o status do pedido

  function setCardStatus(status, idOrder, idItem, name, quantity, table) {

    if (status == 'Aguardando') {
      return `
        <div class="card-container" data-order="${idOrder}" data-item="${idItem}" data-table="${table}">
          <div class="card-d-container">
              <div>
                  <button class="btn-preparing-disabled btn-status btn-left">Em preparo</button>
                  <button class="btn-done-disabled btn-status btn-right">Pronto</button>
              </div>
              <div class="space-y-2">
                  <h2 class="product-name">${name}</h2>
                  <p>Quantidade: ${quantity}</p>
              </div>
              <button type="button" class="btn-delete btn-delete-product" data-delete="product">Excluir Produto</button>
          </div>
        </div>
      `;
    } else if (status == 'Em preparo') {
      return `
      <div class="card-container" data-order="${idOrder}" data-item="${idItem}" data-table="${table}"">
      <div class="card-d-container">
          <div>
              <button class="btn-preparing-active btn-status btn-left">Em preparo</button>
              <button class="btn-done-disabled btn-status btn-right">Pronto</button>
          </div>
          <div class="space-y-2">
              <h2 class="product-name">${name}</h2>
              <p>Quantidade: ${quantity}</p>
          </div>
          <button type="button" class="btn-delete btn-delete-product" data-delete="product">Excluir Produto</button>
      </div>
    </div>
      `;
    } else {
      return `
      <div class="card-container" data-order="${idOrder}" data-item="${idItem}" data-table="${table}">
      <div class="card-d-container">
          <div>
              <button class="btn-preparing-disabled btn-status btn-left">Em preparo</button>
              <button class="btn-done-active btn-status btn-right">Pronto</button>
          </div>
          <div class="space-y-2">
              <h2 class="product-name">${name}</h2>
              <p>Quantidade: ${quantity}</p>
          </div>
          <button type="button" class="btn-delete btn-delete-product" data-delete="product">Excluir Produto</button>
      </div>
    </div>
      
      `;
    }
  }

  //Função para formatar a data

  function formatDate(date) {
    let dateAndTime = date.split(" ");
    dateAndTime = [dateAndTime[0], dateAndTime[2]];
    return dateAndTime;
  }

  //Função para criar o menu de pedidos

  function ordersMenu() {
    $.getJSON(API_URL_GET_ORDERS, function (data) {
      let previousTable = null; // Variável para salvar o número da mesa anterior
      // Itera sobre os pedidos
      $.each(data, function (key, value) {
        let idItem = value.idItemPedido;
        let idOrder = value.idPedido;
        let name = value.nome;
        let quantity = value.quantidade;
        let status = value.status;
        let token = value.token;
        let date = value.datahora;
        let table = value.mesa;

        let $orderContainer = $('.order-grid-container');

        // Verificar se a mesa atual é diferente da mesa anterior

        if (table !== previousTable) {
          // Formatar a data

          let dateArray = formatDate(date);

          // Criar novo título para uma mesa diferente

          let orderTitle = `
          <div class="order-table">
                    <div class="order-table-container">
                        <h2 class="order-title" data-order="${idOrder}" data-table="${table}">Pedido ${idOrder} - Mesa ${table}</h2>
                        <h4 class="order-time">${dateArray[0]} às ${dateArray[1]}</h4>
                    </div>
                    <button class="btn-delete btn-delete-order" data-delete="order">
                        Excluir Pedido
                    </button>
                </div>
          `;

          // Adicionar o título da mesa e o container de produtos

          $orderContainer.append(orderTitle);
        }

        // Criar novo card para cada produto

        let card = setCardStatus(status, idOrder, idItem, name, quantity, table);

        // Adicionar o card ao container de produtos

        $orderContainer.append(card);

        previousTable = table; // Salvar o número da mesa atual como mesa anterior para a próxima iteração
      });
    });
  }

  //Função para pesquisar pedidos e produtos

  function searchOrderAndProducts() {

    $('#search').on('keyup', function () {
      //pegando o valor do input
      let search = $(this).val();

      let orderTitle = $('.order-title');
      let cardContainer = $('.card-container');

      //filtrando os pedidos com base no valor da pesquisa

      orderTitle.each(function () {
        let orderCode = $(this).attr('data-order');
        let orderTable = $(this).closest('.order-table');

        if (orderCode.includes(search) || search === '') {
          orderTable.show();
        } else {
          orderTable.hide();
        }
      });

      cardContainer.each(function () {
        let orderCard = $(this).attr('data-order');

        if (orderCard.includes(search) || search === '') {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
  }
  
  // Função para alterar o status do pedido através do botão

  function changeStatus() {

    $(".order-grid-container").on("click", ".btn-status", function () {

      let parentCard = $(this).closest(".card-container");

      // Pegar o id do item do pedido

      let idItemPedido = parentCard.attr('data-item');

      // Pegar o status que o pedido receberá através do botão

      let status = $(this).text();

      console.log(status);

      // Alterar o status do pedido

      $.ajax({
        url: API_URL_UPDATE,
        type: "POST",
        data: {
          idItemPedido: idItemPedido,
          status: status,
        },
        success: function (data) {
          console.log(`Ok: ${data}`);
        },
        error: function (data) {
          console.log(`Erro: ${data}`);
        }
      });

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

  //Função para excluir pedido

  function deleteOrder() {
    $(".order-grid-container").on("click", ".btn-delete-order", function () {
      let parentOrder = $(this).closest(".order-table");
      let cardContainer = $('.card-container');

      let idOrder = parentOrder.find(".order-title").attr("data-order");

      $.ajax({
        url: API_URL_DELETE_ORDER,
        type: "GET",
        data: {
          idPedido: idOrder,
          method: 'DELETE'
        },
        success: function (data) {
          console.log(`Ok: ${data}`);
        },
        error: function (data) {
          console.log(`Erro: ${data}`);
        }
      });

      cardContainer.each(function () {
        let orderCard = $(this).attr('data-order');

        if (orderCard.includes(idOrder) || idOrder === '') {
          $(this).hide();
        } else {
          $(this).show();
        }
      });

      parentOrder.remove();
    });
  }

  //Função para excluir produto

  function deleteProduct() {
    $('.order-grid-container').on('click', '.btn-delete-product', function () {
      let parentCard = $(this).closest('.card-container');
      let idItemPedido = parentCard.attr('data-item');

      $.ajax({
        url: API_URL_DELETE_PRODUCT,
        type: "GET",
        data: {
          idItemPedido: idItemPedido,
          method: 'DELETE'
        },
        success: function (data) {
          console.log(`Ok: ${data}`);
        },
        error: function (data) {
          console.log(`Erro: ${data}`);
        }
      });

      parentCard.remove();
    });
  
  }
});