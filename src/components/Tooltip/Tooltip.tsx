import { Tooltip as ChakraTooltip, Portal } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

export interface TooltipProps extends ChakraTooltip.RootProps {
    /** Контент тултипа */
    content: React.ReactNode;
    /** Дочерний элемент, на который будет наведен тултип */
    children: React.ReactNode;
    /** Показывать стрелку */
    showArrow?: boolean;
    /** Отключить тултип */
    disabled?: boolean;
    /** Использовать Portal для рендера */
    portalled?: boolean;
    /** Дополнительные props для контента */
    contentProps?: ChakraTooltip.ContentProps;
    /** Ref для Portal контейнера */
    portalRef?: React.RefObject<HTMLElement>;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
    function Tooltip(props, ref) {
        const {
            showArrow,
            children,
            disabled,
            portalled = true,
            content,
            contentProps,
            portalRef,
            ...rest
        } = props;

        if (disabled) return <>{children}</>;

        return (
            <ChakraTooltip.Root {...rest}>
                <ChakraTooltip.Trigger asChild>
                    {children}
                </ChakraTooltip.Trigger>
                <Portal disabled={!portalled} container={portalRef}>
                    <ChakraTooltip.Positioner>
                        <ChakraTooltip.Content ref={ref} {...contentProps}>
                            {showArrow && (
                                <ChakraTooltip.Arrow>
                                    <ChakraTooltip.ArrowTip />
                                </ChakraTooltip.Arrow>
                            )}
                            {content}
                        </ChakraTooltip.Content>
                    </ChakraTooltip.Positioner>
                </Portal>
            </ChakraTooltip.Root>
        );
    }
);

// Добавьте displayName для лучшей отладки
Tooltip.displayName = 'Tooltip';
