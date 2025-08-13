import '@faker-js/faker'

declare module '@faker-js/faker' {
  interface Faker {
    br: {
      /**
       * Returns a single valid Brazilian CPF number.
       *
       * @param opts — Optional settings.
       * @param opts.formatted — When `true`, the returned CPF will be formatted as `XXX.XXX.XXX-YY`.
       *                         Defaults to `false` (only digits).
       *
       * @returns A valid CPF string, either raw (11 digits) or formatted.
       *
       * @throws When CPF generation fails due to internal calculation error (rare).
       *
       * @example
       * faker.br.cpf() // "12345678909"
       * faker.br.cpf({ formatted: true }) // "123.456.789-09"
       */
      cpf: (opts?: { formatted?: boolean }) => string
    }
  }
}
