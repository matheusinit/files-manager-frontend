## Delete files


### Atores
 + Anonymous User

### Pós condições
 + Os arquivos não devem aparecer ao listar arquivos após ação ser concluída

### Fluxo principal

_Extender caso de uso **List files**_

1. Usuário clica no botão de ação "Remover arquivo"
2. Na tela aparecerá opções de seleção de arquivos
3. O usuário selecionará os arquivos para remover
4. Para cada arquivo selecionado o sistema irá mostrar que o arquivo foi selecionado e irá mostrar a quantidade de arquivos preparados para download.
5. O usuário clicará no botão "Finalizar"
6. O sistema irá mostrar um popup com a mensagem "Arquivos removidos com sucesso"
7. O usuário clicará no botão de "OK" para fechar o popup


### Fluxo de exceção - Nenhum arquivo selecionado

_Após o passo 4_

6. O usuário desmarcará o arquivo selecionado
7. O sistema removerá o botão "Finalizar"

