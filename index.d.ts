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

declare module '@edelwud/clang-tools-wrapper' {
  export class Environment {
    constructor(binDir?: string, revision?: number)
    isWin(): boolean
    getArch(): Arch
    getPlatform(): Platform
    getExtension(): Extension
    resolve(): Env
  }
  export class ClangFormat {}
}
