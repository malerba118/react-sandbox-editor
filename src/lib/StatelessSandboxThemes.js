const styles = {
  defaultHeader: {
    backgroundColor: '#eee',
  },
  defaultSelectedTabIndicator: {
    backgroundColor: '#5bc0de',
  },
  defaultTab: {
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.54)',
    opacity: 1,
    minWidth: 30,
    marginRight: 0,
    '&:hover': {
      color: '#5bc0de',
    },
  },
  defaultSelectedTab: {
    color:'#5bc0de',
  },
  defaultIconButton: {
    height: 36,
    width: 36,
    margin: 4
  },
  monokaiHeader: {
    backgroundColor: '#1b1d1a',
  },
  monokaiSelectedTabIndicator: {
    backgroundColor: '#62bcfa',
  },
  monokaiTab: {
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.7)',
    opacity: 1,
    minWidth: 30,
    marginRight: 0,
    '&:hover': {
      color: '#62bcfa',
    },
  },
  monokaiSelectedTab: {
    color:'#62bcfa',
  },
  monokaiIconButton: {
    color: 'white',
    height: 36,
    width: 36,
    margin: 4,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  },
};

export default styles
