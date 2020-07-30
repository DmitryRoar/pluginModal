$.modal = function(options) {
    const $modal = _createModal(options)
    const className = 'open'
    const ANIMATION_TIME = 200
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {
                options.onClose()
                return console.log('modal has been destroyed')
            }

            closing = false
            !closing && $modal.classList.add(className)
        },
        close() {
            closing = true
            $modal.classList.remove(className)
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
                if (typeof options.onClose === 'function') {
                    options.onClose()
                }
            }, ANIMATION_TIME)
        }
    }

    const listeners = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', listeners)

    return {
        ...modal,
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listeners)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    }
}

function _createModal(options) {
    const DEFAULT_WIDTH = `600px`
    const modal = document.createElement('div')
    modal.classList.add('dmodal')
    modal.insertAdjacentHTML('afterbegin', `
      <div class="modal-overlay" data-close="true">
      <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
      <div class="modal-header">
          <span class="modal-title">${options.title || 'static title'}</span>
                ${options.closable 
                ? `<span class="module-close" data-close="true">&times;</span>`
                : ''
                }
      </div>
      <div class="modal-body" data-content>
            ${options.content}
      </div>
      </div>
    </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []) {
    if (!buttons.length) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap
}
