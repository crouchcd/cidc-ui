export interface ICustomWindow extends Window {
    initialData?: string;
}
const currentUrl = window.location.href.split('/portal/')[0] + '/api'
const customWindow: ICustomWindow = window;

export {
    currentUrl,
    customWindow
}