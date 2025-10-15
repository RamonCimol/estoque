// Adiciona o evento de submissão ao formulário.
document.getElementById('registerForm')?.addEventListener('submit', async (event: Event) => {
    // ESTA LINHA É CRUCIAL: Previne o comportamento padrão do formulário.
    event.preventDefault();

    // Obtém os valores dos campos do formulário.
    const usernameInput = document.getElementById('new-username') as HTMLInputElement;
    const passwordInput = document.getElementById('new-password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement;

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
        } else {
            alert(`Erro no registro: ${result}`);
        }

    } catch (error) {
        console.error('Erro na comunicação com a API:', error);
        alert('Não foi possível conectar-se ao servidor. Tenta novamente.');
    }
});