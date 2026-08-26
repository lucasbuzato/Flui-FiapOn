# Flui

App mobile em React Native (Expo) para gerenciamento de veículo elétrico — nível de bateria, postos de recarga favoritos e ações rápidas. Implementado a partir de um design no Figma.

## Stack

- **Expo SDK 57** (React Native 0.86, React 19)
- **TypeScript**
- **expo-linear-gradient** — gradiente de fundo do header
- **react-native-svg** — curva vetorial da navbar inferior
- **@expo-google-fonts/karla** — fonte Karla em todos os pesos usados no design
- **expo-font** + **expo-splash-screen** — carregamento das fontes antes de exibir a tela

> Expo Go **não funciona** com esse projeto: o Expo Go instalado na loja de apps só suporta até o SDK 54, e este projeto usa o SDK 57. Para testar no celular é necessário criar um **development build** (`expo-dev-client`) ou usar o modo web durante o desenvolvimento.

## Estrutura de pastas

```
flui/
├── App.tsx                    # Entry point: carrega as fontes e renderiza a HomeScreen
├── index.ts                   # Registro do app Expo (não editar)
├── app.json                   # Configuração do Expo (ícones, splash, plugins)
├── src/
│   └── screens/
│       └── HomeScreen.tsx     # Tela única implementada (Tela_Inicial do Figma)
├── assets/
│   ├── icon.png, favicon.png,
│   │   android-icon-*.png     # Ícones do app, referenciados em app.json (não remover)
│   └── images/                 # Imagens/ícones extraídos do Figma, usados na HomeScreen
└── tsconfig.json
```

Não há pasta `src/components` — todos os subcomponentes da tela (`ActionBtn`) estão declarados dentro do próprio `HomeScreen.tsx`, já que só são usados ali. Se a tela crescer (nova página, navegação entre rotas), vale extrair componentes reutilizáveis para `src/components/`.

## Como rodar

```bash
npm install

# Web (mais rápido para iterar durante o desenvolvimento)
npm run web

# Emulador/dispositivo Android ou iOS com development build
npm run android
npm run ios
```

Se for testar em um dispositivo físico, é necessário instalar o `expo-dev-client` e gerar um build de desenvolvimento (`eas build --profile development` ou `npx expo run:android` / `npx expo run:ios` localmente), pois o Expo Go da loja não é compatível com o SDK 57.

## Como a tela foi construída

Tudo está em `src/screens/HomeScreen.tsx`. Pontos importantes para quem for dar manutenção:

### Responsividade

Não há valores fixos em pixels. Duas funções fazem a conversão de porcentagem da tela para pixels reais, calculadas a partir de `Dimensions.get('window')`:

```ts
const wp = (pct: number) => (pct / 100) * larguraDaTela;
const hp = (pct: number) => (pct / 100) * alturaDaTela;
```

Todo tamanho, espaçamento e fonte no `StyleSheet` usa `wp(...)` ou `hp(...)`. Isso faz a tela se adaptar a qualquer aparelho sem precisar de breakpoints. Se for adicionar um novo elemento, siga o mesmo padrão em vez de usar números fixos.

> Limitação conhecida: os valores de `wp`/`hp` são calculados uma vez, no momento em que o módulo é importado (`Dimensions.get('window')` fora de qualquer hook). Em telas onde o usuário gira o dispositivo (orientação) ou o app roda em uma janela redimensionável (ex: tablets em split-screen, ou web), o layout não vai se re-calcular automaticamente. Se isso se tornar um requisito, migre `wp`/`hp` para o hook `useWindowDimensions` do React Native.

### Gradiente do banner superior

O `LinearGradient` (`expo-linear-gradient`) cobre os 58% superiores da tela (`gradientContainer`, `height: hp(58)`) e replica o gradiente do Figma:

```
linear-gradient(168.08deg, #FFFFFF 26.55%, #9373AF 38.6%, #210C33 55.62%)
```

convertido para a API do `expo-linear-gradient` via `colors` + `locations` + `start`/`end` (o ângulo em CSS não é diretamente compatível, então foi aproximado com coordenadas `start`/`end`).

A curvatura no canto inferior direito do banner é feita com `borderBottomRightRadius` + `overflow: 'hidden'` no container, não com um SVG.

### Navbar inferior (parte mais delicada)

A barra de baixo tem três camadas empilhadas com `position: absolute` dentro de `navContainer`:

1. `navBarBg` — o retângulo cinza (`#F2F2F2`) que é a barra propriamente dita.
2. `navCurveWrapper` — um `<Svg>` com um `<Path>` branco (curva Bezier extraída direto do arquivo SVG do Figma) posicionado atrás do botão central. Ele cria a ilusão de recorte/cavidade na barra.
3. `navCenterBtn` — o botão roxo-escuro circular com o ícone de raio, posicionado por cima da curva.

O path do SVG (`d="M131.802 21.8891C..."`) foi copiado literalmente do arquivo `nav-curve.svg` que o Figma MCP exportou — o arquivo original não está mais em `assets/` porque o path já está inline no código e não havia mais motivo para manter o `.svg` solto.

Se precisar ajustar a curvatura: mude `width`/`height` do `<Svg>` (mantendo o `viewBox` original) — aumentar a altura relativa à largura torna a curva mais "aberta".

### Sombras (web vs. nativo)

As props `shadow*` do React Native são depreciadas na web (gera warning). Por isso existe o helper `shadow(elevation, color, opacity)` no topo do arquivo: ele gera `boxShadow` (CSS) quando `Platform.OS === 'web'`, e as props `shadow*`/`elevation` nativas nos outros casos. Use sempre esse helper para qualquer novo elemento com sombra — não escreva `shadowColor`/`shadowOffset` direto no `StyleSheet`.

### Assets

Todas as imagens em `assets/images/` foram baixadas do Figma (via Figma MCP) e são importadas com `require(...)` no topo do `HomeScreen.tsx`. Não sobrou nenhum arquivo não utilizado — se remover uma referência de imagem do código, remova o arquivo correspondente também.

### Fontes

A família **Karla** é carregada via `@expo-google-fonts/karla` no `App.tsx`, usando o hook `useFonts`. Os pesos carregados são: `200ExtraLight`, `300Light`, `400Regular`, `500Medium`, `600SemiBold`, `700Bold`, `800ExtraBold`. Ao usar um novo peso no `HomeScreen.tsx`, ele precisa ser importado e adicionado no `useFonts` do `App.tsx` primeiro, senão o texto renderiza com a fonte padrão do sistema.

## Pendências / próximos passos sugeridos

- Os botões (`TouchableOpacity`) da tela não têm nenhuma ação (`onPress`) implementada — são apenas visuais por enquanto.
- Não há navegação entre telas (React Navigation não está instalado). Se for adicionar mais telas, essa é a próxima peça a entrar.
- Não há testes automatizados configurados.
- Para publicar em produção, será necessário configurar variáveis reais em `app.json` (nome do bundle, ícones definitivos, etc.) e gerar builds via EAS.
