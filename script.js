document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let hora = document.getElementById('hora').value.replace(/\D/g, '');
    
    if (hora.length < 4) {
        alert('Hora inválida. Insira pelo menos 4 números no formato HH:MM.');
        return;
    }

    hora = hora.padEnd(6, '0'); // Completar com zeros até 6 números

    const hours = parseInt(hora.slice(0, 2), 10);
    const minutes = parseInt(hora.slice(2, 4), 10);
    const seconds = parseInt(hora.slice(4, 6), 10);

    if (hours > 23 || minutes > 59 || seconds > 59) {
        alert('Hora inválida. Por favor, insira um horário válido no formato HH:MM:SS.');
        return;
    }

    hora = `${hora.slice(0, 2)}:${hora.slice(2, 4)}:${hora.slice(4, 6)}`;

    const checkboxes = document.querySelectorAll('input[name="location"]:checked');
    const selectedLocation = Array.from(checkboxes).map(checkbox => checkbox.value);

    if (selectedLocation.length === 0) {
        alert('Por favor, selecione uma localização.');
        return;
    }

    // Aqui você pode adicionar a lógica de autenticação e processamento dos dados
    alert(`Matrícula: ${username}\nSenha: ${password}\nHora: ${hora}\nLocalização Selecionada: ${selectedLocation[0]}`);
});

// Lógica para permitir apenas uma checkbox selecionada por vez
const checkboxes = document.querySelectorAll('input[name="location"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        checkboxes.forEach(box => {
            if (box !== checkbox) box.checked = false;
        });
    });
});

// Impedir entrada não numérica nos campos de matrícula e senha
document.getElementById('username').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('password').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
});

// Formatar e validar a entrada do campo de hora
document.getElementById('hora').addEventListener('input', function() {
    let input = this.value.replace(/\D/g, '');
    if (input.length > 6) input = input.slice(0, 6);
    
    if (input.length > 4) {
        input = input.slice(0, 4) + ':' + input.slice(4);
    }
    if (input.length > 2) {
        input = input.slice(0, 2) + ':' + input.slice(2);
    }

    this.value = input;
});

// Função para atualizar o relógio
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

// Atualizar o relógio a cada segundo
setInterval(updateClock, 1000);
updateClock(); // Atualizar imediatamente ao carregar a página
