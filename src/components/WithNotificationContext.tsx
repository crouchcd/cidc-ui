import * as React from "react";
import { INotificationContextState, NotificationConsumer } from "./NotificationContext";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export default function withNotificationContext<
  P extends { notificationContext?: INotificationContextState },
  R = Omit<P, 'notificationContext'>
  >(
  Component: React.ComponentClass<P> | React.StatelessComponent<P>
  ): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
      <NotificationConsumer>
        {value => <Component {...props} notificationContext={value} />}
      </NotificationConsumer>
    );
  };
}