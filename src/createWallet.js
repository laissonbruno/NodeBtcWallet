// Importa as bibliotecas necessárias
import bip32 from 'bip32' // Para geração de hierarquia determinística
import bip39 from 'bip39' // Para geração de mnemônicos
import bitcoin from 'bitcoinjs-lib' // Para operações com Bitcoin

// Define a rede como testnet (rede de teste do Bitcoin)
const network = bitcoin.networks.testnet

// Define o caminho de derivação da carteira
const path = `m/49' /1' /0' /0`

// Gera uma nova frase mnemônica
let mnemonic = bip39.generateMnemonic()

// Gera uma seed a partir da frase mnemônica
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Gera a chave raiz (master key) a partir da seed e da rede
let root = bip32.fromSeed(seed, network)

// Deriva a conta (account) a partir da chave raiz e do caminho especificado
let account = root.derivePath(path)

// Deriva o nó (node) da conta
let node = account.derive(0).derive(0)

// Gera um endereço Bitcoin (p2pkh) a partir da chave pública do nó e da rede
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

// Exibe na console as informações da carteira gerada (endereço, chave privada e mnemônico)
console.log(`Carteira Gerada: Endereço = ${btcAddress} | Chave Privada = ${node.toWIF()} | Seed = ${mnemonic}`)
