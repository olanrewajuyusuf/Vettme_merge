const FaceIndicator = () => {
  return (
    <div
        style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%)',
            width: '100px',
            height: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '50%',
        }}
    >
        {/* Face Outline */}
        <div
            style={{
                width: '98px',
                height: '98px',
                border: '1px dashed white',
                borderRadius: '50%',
                position: 'relative',
            }}
        >
            {/* Eyes */}
            <div
            style={{
                position: 'absolute',
                top: '30%',
                left: '20%',
                width: '20px',
                height: '20px',
                border: '1px dashed white',
                borderRadius: '50%',
            }}
            />
            <div
            style={{
                position: 'absolute',
                top: '30%',
                right: '20%',
                width: '20px',
                height: '20px',
                border: '1px dashed white',
                borderRadius: '50%',
            }}
            />
            {/* Mouth */}
            <div
            style={{
                position: 'absolute',
                bottom: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '10px',
                border: '1px dashed white',
                borderTop: 'none',
                borderRadius: '0 0 60px 60px',
            }}
            />
        </div>
    </div>
  )
}

export default FaceIndicator