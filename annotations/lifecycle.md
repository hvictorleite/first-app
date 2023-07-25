# Angular Lifecycle (Hooks)

## 1. ngOnChanges
	É executado logo no início quando um novo componente é criado, mas também é chamado quando uma propriedade vinculada (com '@Input') é modificada.

## 2. ngOnInit
	É executado apenas uma vez, a saber, quando o componente for iniciado. Ocorre depois do método construtor.

## 3. ngDoCheck
	É chamado sempre que a detecção de mudanças for executada, como alguma propriedade mudar de valor, um botão clicado, um Observable que foi resolvido, entre outros momentos de 'check' do Angular. [para casos de uso mais avançados]
	
## 4. ngAfterContentInit
	É chamado sempre que um conteúdo apresentado via tag ngContent é inicializado.
	
## 5. ngAfterContentChecked
	Chamado sempre que a detecção de mudanças verifica o conteúdo projetado no componente
	
## 6. ngAfterViewInit
	É chamado uma vez que a visão do componente em questão é inicializada.

## 7. ngAfterViewChecked
	É chamado sempre que a visão do componente foi verificada, certos de que todas as mudanças foram apresentadas ou nenhuma mudança foi detectada.
	
## 8. ngOnDestroy
	É chamado antes que um componente seja destruído pelo Angular (ngIf == false, por exemplo). Pode ser interessante implementá-lo para fazer algum trabalho de limpeza.
