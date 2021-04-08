type Arch = 'amd64' | 'i386'
type Platform = 'windows' | 'linux' | 'macos'
type Extension = 'exe' | ''

interface Env {
  platform: Platform
  extension: Extension
  arch: Arch
  binDir: string
  revision: number
}

interface ExecConfig {
  input: string
  cwd: string
}

interface FormatterCommand {
  Cursor: number
  IncompleteFormat: boolean
}

interface FormatterResponse {
  command: FormatterCommand
  result: string
}

type ClangFormatStyles = 'Google' | 'LLVM' | 'Chromium' | 'Mozilla' | 'WebKit'

interface ClangFormatFeatures {
  WError?: boolean
  WnoError?: number
  assumeFilename?: string
  cursor?: number
  dryOn?: boolean
  dumpConfig?: boolean
  fallbackStyle?: ClangFormatStyles
  fErrorLimit?: number
  style?: ClangFormatStyles
  help?: boolean
  input: string
  cwd: string
}

interface ClangFormatEditExec {
  exec: string
  editor: string
}

declare module '@edelwud/clang-tools-wrapper' {
  export class Environment {
    constructor(binDir?: string, revision?: number)
    isWin(): boolean
    getArch(): Arch
    getPlatform(): Platform
    getExtension(): Extension
    resolve(): Env
  }
  export class ClangFormat {
    constructor()
    format(clangConfig: ClangFormatConfig): FormatterResponse
    exec(editorConfig: string, execConfig: ExecConfig): string
    help(): string
  }
  export class ClangFormatConfig {
    constructor(config: ClangFormatFeatures)
    generate(): ClangFormatEditExec
    static supportedStyles(): ClangFormatStyles[]
  }
}
