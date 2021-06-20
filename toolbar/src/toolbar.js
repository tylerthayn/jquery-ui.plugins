(function($) {
	$('head').append($(`<style type="text/css">.ui-toolbar,.ui-toolbar-container{position:fixed;left:0;width:100%;min-height:15%} .ui-toolbar-container.bottom{bottom:0} .ui-toolbar-container.top{top:0} .ui-toolbar{transition:.6s;min-height:50px} .ui-toolbar.bottom{bottom:0} .ui-toolbar.top{top:0} .ui-toolbar.hidden{height:0;min-height:0}</style>`))
	let wrapperHtml = '<div class="ui-toolbar-container">'

	$.widget("ui.toolbar", {
		options: {
			autohide: false,
			position: 'top'
		},
		_create: function() {
			this.wrapped = false
			this.element.addClass('ui-toolbar')
			this.element.addClass(this.options.position)
			if (this.options.autohide) {
				this._Wrap()
			}
		},
		destroy: function() {

		},
		_setOption: function(option, value) {
			//$.Widget.prototype._setOption.apply( this, arguments );
			//this._super( key, value );
			this.options[option] = value
			switch (option) {
				case 'autohide':
					if (value) {
						this._Wrap()
					} else {
						this._Unwrap()
					}
					break;
				case 'position':
					this.element.removeClass('top bottom')
					this.element.addClass(value)
					this.element.closest('.ui-toolbar-container').removeClass('top bottom')
					this.element.closest('.ui-toolbar-container').addClass(value)
					this._trigger('position', null, value)
					break;
				default:
					this._super( key, value );
			}
			return this
		},
		_Unwrap: function () {
			if (this.wrapped) {
				this._trigger('autohide', null, false)
				this.element.parent().replaceWith(this.element.detach())
				this.element.removeClass('hidden')
				this.wrapped = false
			}
		},
		_Wrap: function () {
			if (!this.wrapped) {
				this._trigger('autohide', null, true)
				this.element.addClass('hidden')
				let wrapper = $(wrapperHtml)
				wrapper.addClass(this.options.position)
				wrapper.append(this.element.replaceWith(wrapper))
				wrapper.on('mouseenter', ()=>{
					this.element.removeClass('hidden')
					this._trigger('show', null, this.element)
				})
				wrapper.on('mouseleave', ()=>{
					this.element.addClass('hidden')
					this._trigger('hide', null, this.element)
				})
				this.wrapped = true
			}
		}
    })

	$(() => {
		$('.UiToolbar').each((i, e) => {
			$(e).toolbar({
				autohide: $(e).data('autohide') || false,
				position: $(e).data('position') || 'top'
			})
			$(e).removeClass('UiToolbar')
			$(e).removeAttr('data-autohide')
			$(e).removeAttr('data-position')
		})
	})

})(jQuery)



