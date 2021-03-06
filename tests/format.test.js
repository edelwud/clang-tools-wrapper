const { ClangFormat, ClangFormatConfig } = require('../lib')

describe('clang-format', () => {
  const clangFormat = new ClangFormat()

  const notFormatted = `
    #include <iostream>
    
    int main() { std::cout << "Hello, world!" << std::endl; return 0; }
    `

  test('Google formatting Style', () => {
    const formatted = `
#include <iostream>

int main() {
  std::cout << "Hello, world!" << std::endl;
  return 0;
}
`

    const config = new ClangFormatConfig({
      style: 'Google',
    })

    const { result } = clangFormat.format(notFormatted, config)

    expect(result).toBe(formatted)
  })

  test('LLVM formatting Style', () => {
    const formatted = `
#include <iostream>

int main() {
  std::cout << "Hello, world!" << std::endl;
  return 0;
}
`

    const config = new ClangFormatConfig({
      style: 'LLVM',
    })

    const { result } = clangFormat.format(notFormatted, config)

    expect(result).toBe(formatted)
  })

  test('Chromium formatting Style', () => {
    const formatted = `
#include <iostream>

int main() {
  std::cout << "Hello, world!" << std::endl;
  return 0;
}
`

    const config = new ClangFormatConfig({
      style: 'Chromium',
    })

    const { result } = clangFormat.format(notFormatted, config)

    expect(result).toBe(formatted)
  })

  test('Mozilla formatting Style', () => {
    const formatted = `
#include <iostream>

int
main()
{
  std::cout << "Hello, world!" << std::endl;
  return 0;
}
`

    const config = new ClangFormatConfig({
      style: 'Mozilla',
    })

    const { result } = clangFormat.format(notFormatted, config)

    expect(result).toBe(formatted)
  })

  test('WebKit formatting Style', () => {
    const formatted = `
#include <iostream>

int main()
{
    std::cout << "Hello, world!" << std::endl;
    return 0;
}
`

    const config = new ClangFormatConfig({
      style: 'WebKit',
    })

    const { result } = clangFormat.format(notFormatted, config)

    expect(result).toBe(formatted)
  })
})
