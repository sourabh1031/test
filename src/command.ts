import * as Config from '@oclif/config'

import {loadConfig} from './load-config'

export function command(args: string[] | string, opts: loadConfig.Options = {}) {
  return {
    async run(ctx: {config: Config.IConfig, expectation: string}) {
      if (!ctx.config || opts.reset) ctx.config = await loadConfig(opts).run({} as any)
      args = castArray(args)
      let [id, ...extra] = args
      ctx.expectation = ctx.expectation || `runs ${args.join(' ')}`
      await ctx.config.runHook('init', {id, argv: extra})
      await ctx.config.runCommand(id, extra)
    }
  }
}

const castArray = <T>(input?: T | T[]): T[] => {
  if (input === undefined) return []
  return Array.isArray(input) ? input : [input]
}
