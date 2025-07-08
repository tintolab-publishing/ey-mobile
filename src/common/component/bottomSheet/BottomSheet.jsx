import React, { useCallback, useContext } from 'react';
import { Drawer } from 'vaul';
import styles from '../../../modal/Alert.module.css';
import { AppContext } from '../../share/AppContext';

const BottomSheet = ({ isOpen, onClose, children, title, description, small }) => {
    // Alert가 열려있는지 확인
    const cmn = useContext(AppContext);

    const isAlertOpen = cmn.alert.show

    return (
        <Drawer.Root
            open={isOpen}
            onOpenChange={(open) => {
                // Alert가 열려있을 때는 바텀시트 닫기 이벤트 무시
                if (!isAlertOpen && !open) onClose();
            }}
        >
            <Drawer.Overlay
                className="fixed inset-0 bg-black bg-opacity-50"
                style={{
                    zIndex: 100,
                    pointerEvents: isAlertOpen ? 'none' : 'auto'
                }}
            />
            <Drawer.Portal>
                <Drawer.Content
                    className={`popup-container ${small && 'alert'}`}
                    style={{
                        zIndex: 101,
                        pointerEvents: isAlertOpen ? 'none' : 'auto'
                    }}
                >
                    <div
                        className="popup-inner"
                        style={{
                            pointerEvents: isAlertOpen ? 'none' : 'auto'
                        }}
                    >
                        <Drawer.Title className="sr-only">
                            {title || "Bottom Sheet"}
                        </Drawer.Title>
                        <Drawer.Description className="sr-only">
                            {description || "This is a bottom sheet component"}
                        </Drawer.Description>
                        {children}
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default BottomSheet;