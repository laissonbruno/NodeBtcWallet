# Gerador de Carteira Bitcoin

Código em Javascript para gerar uma carteira Bitcoin usando hierarquia determinística, mnemônicos e bibliotecas específicas para operações com Bitcoin.


## Pré-Requisitos

Certifique-se de ter as seguintes bibliotecas instaladas:

- bip32: Para geração de hierarquia determinística.
- bip39: Para geração de mnemônicos.
- bitcoinjs-lib: Para operações com Bitcoin.

Você pode instalar as bibliotecas usando npm:

``` vbnet

npm install bip32 bip39 bitcoinjs-lib

```

## Como usar

1. Clone este repositório ou copie o código para um arquivo JavaScript.
2. Certifique-se de que as bibliotecas necessárias estejam instaladas.
3. Execute o script.

``` javascript

// Importa as bibliotecas necessárias
import bip32 from 'bip32'; // Para geração de hierarquia determinística
import bip39 from 'bip39'; // Para geração de mnemônicos
import bitcoin from 'bitcoinjs-lib'; // Para operações com Bitcoin

// Define a rede como testnet (rede de teste do Bitcoin)
const network = bitcoin.networks.testnet;

// Define o caminho de derivação da carteira
const path = `m/49' /1' /0' /0`;

// Gera uma nova frase mnemônica
let mnemonic = bip39.generateMnemonic();

// Gera uma seed a partir da frase mnemônica
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Gera a chave raiz (master key) a partir da seed e da rede
let root = bip32.fromSeed(seed, network);

// Deriva a conta (account) a partir da chave raiz e do caminho especificado
let account = root.derivePath(path);

// Deriva o nó (node) da conta
let node = account.derive(0).derive(0);

// Gera um endereço Bitcoin (p2pkh) a partir da chave pública do nó e da rede
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

// Exibe na console as informações da carteira gerada (endereço, chave privada e mnemônico)
console.log(`Carteira Gerada: Endereço = ${btcAddress} | Chave Privada = ${node.toWIF()} | Seed = ${mnemonic}`);


```



Isso gerará um novo endereço Bitcoin, uma chave privada e uma frase mnemônica. Certifique-se de armazenar essas informações com segurança, pois elas são essenciais para acessar e controlar os fundos da carteira.


