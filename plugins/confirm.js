$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: `400px`,
            content: options.content,
            onClose() {
                modal.destroy()
            },
            closable: false,
            footerButtons: [
                {text: 'cancel', type: 'secondary', handler() {
                    modal.close()
                    reject()
                }},
                {text: 'delete', type: 'danger', handler() {
                    modal.close()
                    resolve()
                }}
            ]
        })
        setTimeout(() => {
            modal.open()
        }, 200)
    })
}
