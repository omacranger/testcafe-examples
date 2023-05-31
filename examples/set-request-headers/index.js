import { RequestHook, ClientFunction } from 'testcafe';

export default class CustomRequestHook extends RequestHook {
    constructor (requestFilterRules, responseEventConfigureOpts) {
        super(requestFilterRules, responseEventConfigureOpts);
        this.customHeader = 'test';
    }

    async onRequest (requestEvent) {
        requestEvent.requestOptions.headers['custom-header'] = this.customHeader;
    }

    // eslint-disable-next-line no-unused-vars
    async onResponse (responseEvent) {
    }
}

fixture `Download file`
    .page('./index.html')
    .requestHooks(new CustomRequestHook(undefined, undefined));

test('Set / override request headers', async t => {
    const getBody = ClientFunction(() => JSON.parse(document.body.innerHTML).headers['custom-header']);

    await t.expect(getBody()).eql('test');
});
