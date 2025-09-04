import { useMemo, useState, type CSSProperties } from 'react'
import type { Instance, Options, State } from '@popperjs/core'
import { useClickAway } from '@uidotdev/usehooks'
import { usePopper } from 'react-popper'

interface AppPopperProps<Reference, Popper, Arrow> {
  isOpen: boolean
  onClose: () => void
  referenceElement?: Reference
  popperElement?: Popper
  arrowElement?: Arrow
  clickAway: boolean
  options: Partial<Options>
}

interface AppPopperReturn<Reference, Popper, Arrow> {
  referenceElement: Reference | null
  setReferenceElement: (referenceElement: Reference | null) => void
  popperElement: Popper | null
  setPopperElement: (popperElement: Popper | null) => void
  arrowElement: Arrow | null
  setArrowElement: (arrowElement: Arrow | null) => void
  styles: Record<string, CSSProperties>
  attributes: Record<string, Record<string, string> | undefined>
  state: State | null
  update: Instance['update'] | null
  forceUpdate: Instance['forceUpdate'] | null
}

const useAppPopper = <
  Reference extends HTMLElement = HTMLElement,
  Popper extends HTMLElement = HTMLElement,
  Arrow extends HTMLElement = HTMLElement
>({
  isOpen,
  onClose,
  referenceElement: referenceElementProp,
  popperElement: popperElementProp,
  arrowElement: arrowElementProp,
  clickAway,
  options: optionsProps
}: AppPopperProps<Reference, Popper, Arrow>): AppPopperReturn<
  Reference,
  Popper,
  Arrow
> => {
  const [referenceElement, setReferenceElement] = useState<Reference | null>(
    null
  )
  const [popperElement, setPopperElement] = useState<Popper | null>(null)
  const [arrowElement, setArrowElement] = useState<Arrow | null>(null)

  const options = useMemo(() => {
    const opts = { ...optionsProps }
    if (optionsProps.modifiers === undefined) return

    const index = optionsProps.modifiers.findIndex((it) => it.name === 'arrow')
    if (index !== -1) {
      optionsProps.modifiers[index].options ??= {}
      optionsProps.modifiers[index].options.element =
        arrowElementProp ?? arrowElement
    }

    return opts
  }, [arrowElement, arrowElementProp, optionsProps])

  const { attributes, styles, ...popper } = usePopper(
    referenceElementProp ?? referenceElement,
    popperElementProp ?? popperElement,
    options
  )

  const combinedAttributes = useMemo(() => {
    const attrs = { ...attributes }
    if (attrs.popper !== undefined && isOpen) {
      attrs.popper['data-show'] = 'true'
    }

    attrs.arrow ??= {}
    attrs.arrow['data-popper-arrow'] = ''

    return attrs
  }, [attributes, isOpen])

  const ref = useClickAway<Popper>(() => {
    if (!clickAway) return

    if (popperElement !== null && isOpen) {
      onClose()
    }
  })

  const handlePopperElementChange = (popperElement: Popper | null): void => {
    setPopperElement(popperElement)

    if (popperElement !== null) {
      ref.current = popperElement
    }
  }

  return {
    referenceElement,
    setReferenceElement,
    popperElement,
    setPopperElement: handlePopperElementChange,
    arrowElement,
    setArrowElement,
    attributes: isOpen ? combinedAttributes : {},
    styles: isOpen ? styles : {},
    ...popper
  }
}

export default useAppPopper
