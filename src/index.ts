import Koa from "koa";
import IoCContainer from "tioc";

export type InjectorSeeder<TResultIoCContainer extends IoCContainer> = (
  container: IoCContainer,
) => TResultIoCContainer;

export default function injector<TIoCContainer extends IoCContainer>(
  seeder: InjectorSeeder<TIoCContainer>,
) {
  return function (ctx: Koa.Context & { container: TIoCContainer }) {
    ctx.container = seeder(new IoCContainer());
  };
}
