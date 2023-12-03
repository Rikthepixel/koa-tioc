import Koa from "koa";
import IoCContainer from "tioc";

export { IoCContainer };

export type InjectorSeeder<TResultIoCContainer extends IoCContainer> = (
  container: IoCContainer,
) => TResultIoCContainer | Promise<TResultIoCContainer>;

export interface InjectorContext<TIoCContainer extends IoCContainer> {
  container: TIoCContainer;
}

/**
 * Shim middlware that acts as if it adds a container to the koa context.
 *
 * This is usefull for when the context includes a IoCContainer, but it is not included in the typings.
 * Alternatively extends the default context of Koa with the InjectorContext.
 */
export function shimInjector<TIoCContainer extends IoCContainer>() {
  return async function (
    _ctx: Koa.Context & InjectorContext<TIoCContainer>,
    next: Koa.Next,
  ) {
    return await next();
  };
}

/**
 * Dependency injection middleware that add a container to the koa context
 *
 * @param seeder {InjectorSeeder<IoCContainer>} A function that gets called every time a request comes in
 */
export default function injector<TIoCContainer extends IoCContainer>(
  seeder: InjectorSeeder<TIoCContainer>,
) {
  return async function (
    ctx: Koa.Context & InjectorContext<TIoCContainer>,
    next: Koa.Next,
  ) {
    ctx.container = await seeder(new IoCContainer());
    return await next();
  };
}
