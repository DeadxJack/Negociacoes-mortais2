document.getElementById("payment-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;
    const street = document.getElementById("street").value;
    const number = document.getElementById("number").value;
    const complement = document.getElementById("complement").value;
    const zipCode = document.getElementById("zipCode").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    const paymentType = document.getElementById("paymentType").value;
    const cardBrand = document.getElementById("cardBrand").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const securityCode = document.getElementById("securityCode").value;
    const installments = document.getElementById("installments").value;
    const amount = document.getElementById("amount").value;

    // Gere um ID de pedido único (pode ser implementado de forma diferente)
    const merchantOrderId = generateMerchantOrderId();

    // Crie o objeto formData com os valores dos campos do formulário
    const formData = {
        MerchantOrderId: merchantOrderId,
        Customer: {
            Name: name,
            Email: email,
            Birthdate: birthdate,
            Address: {
                Street: street,
                Number: number,
                Complement: complement,
                ZipCode: zipCode,
                City: city,
                State: state,
                Country: country,
            },
        },
        Payment: {
            Currency: "BRL",
            Country: "BRA",
            ServiceTaxAmount: 0,
            Installments: installments,
            Interest: "ByMerchant",
            Capture: true,
            Authenticate: "false",
            Recurrent: "false",
            SoftDescriptor: "123456789ABCD",
            CreditCard: {
                CardNumber: cardNumber,
                Holder: name, // Use o nome do cliente como titular do cartão neste exemplo
                ExpirationDate: "12/2030", // Data de expiração fictícia neste exemplo
                SecurityCode: securityCode,
                SaveCard: "false",
                Brand: cardBrand,
                CardOnFile: {
                    Usage: "Used",
                    Reason: "Unscheduled"
                }
            },
            InitiatedTransactionIndicator: {
                Category: "C1",
                Subcategory: "Standingorder"
            },
            IsCryptoCurrencyNegotiation: true,
            Type: paymentType,
            Amount: amount
        },
    };

    // Agora você pode usar o objeto formData para enviar os dados para a API Cielo
    // Usando a função fetch ou outra maneira de sua escolha

    // Exemplo de uso do fetch
    fetch("https://apisandbox.cieloecommerce.cielo.com.br/sales/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "MerchantId": "1bf6bac0-36ca-4b6c-80d9-4085e9c378b5",
            "MerchantKey": "DYABMHCXHZYTPDKYLIKFNYZSWSKKVGLUXAFFHDYU",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            // Lide com a resposta da API Cielo aqui
            console.log(data);
        })
        .catch((error) => {
            // Lide com erros de solicitação aqui
            console.error(error);
        });
});

// Função para gerar um ID de pedido único (pode ser implementado de forma diferente)
function generateMerchantOrderId() {
    const timestamp = new Date().getTime();
    const randomId = Math.floor(Math.random() * 1000);
    return `Order-${timestamp}-${randomId}`;
}

