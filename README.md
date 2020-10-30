# Velkommen til Movie Database

Movie Database gir deg muligheten til å søke gjennom en stor filmdatabase på rundt 4800 filmer utgitt fra 1916 til 2017. Du har mulighet til å filtrere søkeresultatet på årstall eller gjennomsnittlig poengscore filmene har fått av tidligere anmeldere, og du kan sortere søkeresultatet slik du vil. Om du vil vite mer om en film kan du trykke på den, få litt mer info, og til og med skrive en anmeldelse. Kanskje er du ikke så glad i å skrive anmeldelser, og da kan du nøye deg med å lese hva andre har skrevet om denne filmen.

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.idi.ntnu.no/#https://gitlab.stud.idi.ntnu.no/it2810-h20/team-58/reacting-movies)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Installasjon

Enkel lokal installasjon med:

```terminal
>git clone https://gitlab.stud.idi.ntnu.no/it2810-h20/team-58/reacting-movies.git
>cd reacting-movies
>npm install
```

Deretter start med `npm start`, eller kjøre tester med `npm run cypress:run` (terminal) eller `npx cypress open` (cypress applikasjon).

# Dokumentasjon

Vi kom fort frem til at vi ville implementere søk i en film-database, og fant et passende [datasett på Kaggle](https://www.kaggle.com/tmdb/tmdb-movie-metadata).

Her kommer en diskusjon av de viktigste valgene rundt valg av teknologi og løsninger for prosjektet.

## Frontend

### React

Prosjektet bruker React med Typescript i frontend. Vi har bare brukt funksjonelle komponenter og med stor bruk av React Hooks.

### Material UI

Vi har brukt komponentbiblioteket Material UI for å bruke store deler av ferdiglagde komponenter. Viktige komponenter som er brukt fra Material UI er:

- DataGrid: brukes for å vise filmer fra databasen og UI for pagination og sortering av kolonner. Vi satte `paginationMode` og `sortingMode` lik `server`, for at sortering og pagination ikke skulle behandles på klientsiden, men serversiden. Videre sender vi inn bl.a kolonnedefinisjoner, rader med data og loading-state som props til komponenten for å vise kolonner med data og loading som tilbakemelding til brukeren.
- Slider: brukes for å legge til mulighet for filtrering av utgivelsesår og gjennomsnittsstemmer. Nyttige funksjoner som vi brukte var blant annet `onChange` og `onChangeCommitted`, hvor førstnevnte kalles hver gang slideren endres, mens sistnevnte kalles når bruker slipper musa / løfter fingeren ved touch.
- TextField: brukes for å lage et søkefelt for bruker til å skrive inn filmtittel som det skal søkes etter.

Vi brukte Material UI sin theme-løsning for å enkelt kunne ha samme grunnlag for styles i hele applikasjonen. Vi er glade for at vi brukte et Material UI siden vi raskt kunne få et fint bruker-interface med komponenter som inneholdt mye funksjonalitet vi ellers hadde måtte lage selv.

### Redux

Vi valgte å bruke Redux som state manager siden det er et veletablert rammeverk med god dokumentasjon. I hovedsak har vi brukt Redux for å håndtere query-variabler som brukes til GraphQL kallet. Dette viste seg å være en god løsning siden når f.eks man søker etter en film og endrer state for søkestreng, så kunne vi i reducer-funksjonen også oppdatere page til å være lik 1, og dermed vise de første og beste resultatene som matcher søket. Vi brukte `useSelector` hooken fra `react-redux` til å hente ut data fra store, og `useDispatch` hooken til å starte actions.

### Apollo GraphQL

Vi har brukt GraphQL for kommunikasjon med databasen, og valgte [Apollo](https://www.apollographql.com/docs/react/) som klient for GraphQL i frontend. En av de virkelig fine funksjonene til Apollo er funksjonen `InMemoryCache` som lagrer tidligere søk i cache. Når bruker velger å gå til neste side av et søkeresultat, og deretter tilbake til forrige side så vil Apollo i stedet for å hente ny data fra database, heller bare hente ut data fra cache. Dette sikrer god ytelse på siden.
I tillegg brukte vi `useQuery` og `useMutation` som er to Hooks for å gjøre GrahpQL queries (read) og mutations (create, update, delete). Disse returner blant annet loading og error variabler som man kan enkelt bruke for å gi visuell feedback til bruker om at siden laster inn ny data, eller om noe har gått galt.

### Framer Motion

Vi har brukt [Framer Motion](https://www.framer.com/motion) for å enkelt legge til noen subtile animasjoner når komponenter rendres.

## Backend

### API

Der man i et REST api typisk har mange forskjellige endepunkt, som alle fungerer til å gi forskjellige typer data, vil man i GraphQL ha bare et endepunkt, og så spesifiserer man akkurat den dataen man vil ha i requesten. Dette gir en stor fleksibilitet i spørringene, og man unngår å hente mer data enn man trenger hvis REST-endepunktet ikke er spesielt tilpasset akkurat det man henter data for. GraphQL har hatt en veldig stigende popularitet de senere årene, og vi valgte å gå for det.

For å bruke dette er det to ting vi måtte definere, og det er typer og resolver-funksjoner. Typedefinisjonene er en slags dokumentasjon på hva slags data vi gjør tilgjengelig i databasen, og strukturen på den dataen. Resolver-funksjonene er de funksjonene som faktisk blir kjørt når vi gjør spørringer til graphql-endepunktet, og som dermed henter og returnerer data fra databasen. Det er i resolver-funksjonene at all filtrering og sortering skjer, basert på input-parametre, slik at man får ferdig behandlet resultatsett hos klienten.

### Database

Siden dette er en node.js backend, valgte vi å gå for [MongoDB](https://www.mongodb.com/). Dette er en gratis NoSQL database, som lagrer dataen i “dokumenter”, strukturert ganske likt som JSON, noe som gjør det til en bra match for node.js applikasjoner.

For modellering av data og query-ing av databasen har vi brukt tredjeparts-biblioteket [mongoose](https://mongoosejs.com/). Dette gjør det veldig lettvint å sette opp skjema og modeller for dataen, koble seg til databasen og hente ut data med query-oppbygning som er veldig likt MongoDB sitt offisielle.

I databasen har vi to “collections” av data. En collection er selve film-databasen, og denne gjør vi ingen endringer på, bare leser fra. I tillegg til denne har vi en collection som er filmanmeldelser, og det er denne vi legger til data i når noen skriver en anmeldelse på en film.

### Server

Vi valgte å gå for en kombinasjon av [Express](https://expressjs.com/) og [Apollo](https://www.apollographql.com/) (via [apollo-server-express](https://www.npmjs.com/package/apollo-server-express)) for selve implementasjonen av serveren. Dette fordi express er det mest populære web-rammeverket for node.js, som gjør at det er mye dokumentasjon ute. Apollo Server er også veldig godt dokumentert, og det var ikke problematisk å finne gode tutorials på å sette opp dette.

Serveren kjører som en bakgrunnsprosess på samme VM som databasen ligger.

### Struktur

Vi har valgt å putte backend i en egen mappe i prosjektet, men siden dette er et prosjekt med et relativt begrenset omfang har vi ikke initialisert mappen med en egen package.json, og bruker samme `node_modules` som resten av prosjektet.

Dette har fungert fint for nå, men med tanke på at server-siden og klient-siden kjører såpass separert, så hadde det nok ikke vært dumt å kjøre en egen `npm init` inne i backend mappen for å separere den litt ekstra. Vi får nå f.eks. litt problemer med at tsconfig.json blir endret når vi kjører npm start, ettersom den og serveren vil ha litt forskjellige konfigurasjoner av “module”-verdien der. Vi har løst det enkelt ved å ikke committe endringer i tsconfig, slik at serveren får kjøre uten problemer på VM.

## Testing

Vi har valgt å bruke [Cypress](https://www.cypress.io/) for testing, ettersom det er et veldig kraftfullt, men også enkelt å bruke ende-til-ende test-rammeverk. I tillegg til automatiserte ende-til-ende tester, så har de også muligheten til å kjøre enhetstesting, som en eksperimentell funksjon man kan skru på. Dette har gjort at vi kunne holde oss til et rammeverk for alt av testing.

Vi har laget totalt 15 tester hvor 8 stk er integrasjonstester, og 7 stk er komponenttester/enhetstester. Vi har nok fortsatt litt å gå på med tanke på omfanget av testene våre, men det har vært veldig lærerikt å sette opp og bruke Cypress for å teste ende-til-ende på dette prosjektet. Kan se at det nok er lurt å komme tidlig i gang med testing, og ikke utsette det til slutt, for å sørge for en mer helhetlig og total testing av prosjektet.
