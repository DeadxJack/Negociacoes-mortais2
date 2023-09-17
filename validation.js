document.addEventListener("DOMContentLoaded", function () {
    const cardCodeInput = document.getElementById("securityCode");
    const cepInput = document.getElementById("zipCode");
    const cardNumberInput = document.getElementById("cardNumber");
    const amountInput = document.getElementById("amount");

    // Regra 1: Permitir apenas números e no máximo 3 dígitos no campo Código do Cartão
    cardCodeInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 3);
    });

    // Regra 2: Permitir apenas números e no máximo 8 dígitos no campo CEP
    cepInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 8);
    });

    // Regra 3: Permitir apenas números e no máximo 16 dígitos no campo Número do Cartão
    cardNumberInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 16);
    });

    // Regra 5: Formatação de moeda no campo de valor
    amountInput.addEventListener("input", function () {
        // Remove qualquer caractere não numérico
        let value = this.value.replace(/\D/g, "");

        // Formata o valor como moeda (0,00)
        value = value.replace(/^0+/g, ""); // Remove zeros à esquerda
        if (value.length === 0) {
            value = "0";
        } else if (value.length === 1) {
            value = "0,0" + value;
        } else if (value.length === 2) {
            value = "0," + value;
        } else {
            value = value.replace(/^(\d+)(\d{2})$/, "$1,$2");
        }

        this.value = value;
    });
});