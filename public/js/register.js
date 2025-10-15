var _a;
// Adiciona o evento de submissão ao formulário.
(_a = document.getElementById('registerForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', async (event) => {
    // ESTA LINHA É CRUCIAL: Previne o comportamento padrão do formulário.
    event.preventDefault();
    // Obtém os valores dos campos do formulário.
    const usernameInput = document.getElementById('new-username');
    const passwordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    // Validação básica do lado do cliente.
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }
    // Envia os dados para a tua API.
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const result = await response.text();
        if (response.ok) {
            alert(result);
            window.location.href = '/login.html';
        }
        else {
            alert(`Erro no registo: ${result}`);
        }
    }
    catch (error) {
        console.error('Erro na comunicação com a API:', error);
        alert('Não foi possível conectar-se ao servidor. Tenta novamente.');
    }
});
