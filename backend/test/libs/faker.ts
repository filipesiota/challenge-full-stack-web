import { faker } from '@faker-js/faker'

function applyChecker(nums: number[]) {
  const sum = nums.reduce((acc, num, i) => acc + num * (nums.length + 1 - i), 0)
  const mod = sum % 11
  return mod < 2 ? 0 : 11 - mod
}

function generateCpf(): string {
  const base = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
  const d1 = applyChecker(base)
  const d2 = applyChecker([...base, d1])
  return [...base, d1, d2].join('')
}

function formatCpf(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

faker.br = {
  cpf(opts?: { formatted?: boolean }) {
    const raw = generateCpf()
    return opts?.formatted ? formatCpf(raw) : raw
  },
}

export { faker }
