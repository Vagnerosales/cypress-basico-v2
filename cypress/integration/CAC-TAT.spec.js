
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const three_seconds_in_ms = 3000
    beforeEach(function(){
      cy.visit('./src/index.html')
    })
  
    it('verifica o título da aplicação', function() {
      //cy.visit('https://google.com')
      cy.visit('./src/index.html')
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  
    })
    it('preencher os campos obrigatórios e enviar o formulário', function() {
      const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, '
  
      cy.clock()
  
      cy.get('#firstName').type('Vagner ')
      cy.get('#lastName').type('Rosales')
      cy.get('#email').type('vagnerrosales@gmail.com')
      cy.get('#open-text-area').type(longText, {delay: 0})
      //cy.get('button[type="submit"]').click()
      cy.contains('button','Enviar').click()
    
      cy.get('.success').should('be.visible')
      cy.tick(three_seconds_in_ms)
      cy.get('.success').should('not.be.visible')
  
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação', function() {
     
      cy.clock()
      cy.get('#firstName').type('Vagner ')
      cy.get('#lastName').type('Rosales')
      cy.get('#email').type('vagnerrosales@gmail,com')
      cy.get('#open-text-area').type('Teste')
      cy.get('button[type="submit"]').click()
    
      cy.get('.error').should('be.visible')
      cy.tick(three_seconds_in_ms)
      cy.get('.error').should('not.be.visible')
  
    })
    Cypress._.times(3, function(){
      it('campo telefone continua vazio quando preenchido com o valor não-numérico', function() {
     
      cy.get('#phone')
        .type('asdasd')
        .should('have.value', '')
      })
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido ', function() {
     
      cy.clock()
      cy.get('#firstName').type('Vagner ')
      cy.get('#lastName').type('Rosales')
      cy.get('#email').type('vagnerrosales@gmail.com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste')
      cy.get('button[type="submit"]').click()
    
      cy.get('.error').should('be.visible')
      cy.tick(three_seconds_in_ms)
      cy.get('.error').should('not.be.visible')
     
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone ', function() {
     
      cy.get('#firstName')
      .type('vagner')
      .should('have.value','vagner')
      .clear()
      .should('have.value', '')
  
      cy.get('#lastName')
      .type('rosales')
      .should('have.value','rosales')
      .clear()
      .should('have.value', '')
  
      cy.get('#email')
      .type('vagnerrosales@gmail.com')
      .should('have.value','vagnerrosales@gmail.com')
      .clear()
      .should('have.value', '')
  
      cy.get('#open-text-area')
      .type('teste')
      .should('have.value','teste')
      .clear()
      .should('have.value', '')
  
      cy.get('#phone')
      .type('12345678')
      .should('have.value','12345678')
      .clear()
      .should('have.value', '')
     
    })
    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatório ', function() {
      cy.clock()
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')
      cy.tick(three_seconds_in_ms)
      cy.get('.error').should('not.be.visible')
     
    })
    it.only('envia formulário com sucesso usando um comando customizado ', function() {
      cy.clock()
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
      cy.tick(three_seconds_in_ms)
      cy.get('.success').should('not.be.visible')
  
    })
  
    it('selecione um produto (youtube) por seu texto', function() {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })
    it('selecione um produto (mentoria) por seu valor (value)', function() {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })
    it('selecione um produto (blog) por seu índice' , function() {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "feedback"' , function() {
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value','feedback')
    })
    it('marca cada tipo de atendimento' , function() {
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      }) 
    })
    it('marca ambos checkeboxes, depois desmarca o último' , function() {
      cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
      .should('not.be.checked')
      }) 
      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido ', function() {
     
        cy.get('#firstName').type('Vagner ')
        cy.get('#lastName').type('Rosales')
        cy.get('#email').type('vagnerrosales@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
      
        cy.get('.error').should('be.visible')
       
      })
      it('selecioneum arquivo da pasta fixture' , function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
           })
         })
      it('selecioneum arquivo simulado um drag-and-drop' , function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
        })
      it('selecioneum arquivo utilizando uma fixture para a qual foi data um alias' , function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
        })
      it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr','target', '_blank')
        }) 
  
      it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
        }) 
  
      it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
        }) 
      it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
            
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
        })  
        it('preenche a area de texto usando o comando invoke', function() {
          const longText = Cypress._.repeat('0123456789', 20)
          
          cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
  
          })
        it('faz uma requisição HTTP', function(){
          cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
              const { status, statusText, body } = response
              expect(status).to.equal(200)
              expect(statusText).to.equal('OK')
              expect(body).to.include('CAC TAT')
            })
          })
        it('encontra o gato escondido', function(){
          cy.get('#cat')
            .invoke('show')
            .should('be.visible')
  
          cy.get('#title')
            .invoke('text', 'CAR TAT')
  
          cy.get('#subtitle')
            .invoke('text', 'EU gosto 🚗')
            
          })
        }) 
     
  
  
  
  