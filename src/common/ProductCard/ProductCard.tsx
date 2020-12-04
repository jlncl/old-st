import { Button, Card, CardActionArea, CardContent, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Theme, Typography } from '@material-ui/core';
import { useState } from 'react';
import moment from 'moment';
import { IProductCardProps } from '../../interface/Product';

const ProductCard = (props: IProductCardProps) => {
  const product = props.data;
  const [enlarge, setEnlarge] = useState(false);
  const [open, setOpen] = useState(false);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        background: enlarge ? '#212129' : 'none',
        borderRadius: 10,
        boxShadow: 'none',
        color: 'white',
        position: 'relative',
        textAlign: 'center',
        whiteSpace: 'nowrap',
      },
      product: {
        transition: 'all 0.5s ease',
        fontSize: enlarge ? product.size : 20,
        color: '#c3989e',
        padding: '20px 0',
      },
      hover: {
        background: 'rgba(33,33,41,0.8)',
        display: 'flex',
        padding: 0,
        position: 'absolute',
        height: '100%',
        width: '100%',
      },
      button: {
        margin: 'auto',
        zIndex: 1,
      },
      buy: {
        color: '#c3989e',
        marginTop: 20,
        zIndex: 1,
      }
    }),
  );
  const classes = useStyles();

  const handleOnClick = () => setEnlarge(!enlarge);

  const parseDate = (date: string) => {
    const d1 = moment(new Date());
    const d2 = moment(date)
    const diff = d1.diff(d2);
    if (moment.duration(diff).months() === 0 && moment.duration(diff).days() <= 7) {
      return moment.duration(diff*-1).humanize(true, {d:7, w:4});
    }
    return moment(date).format('on MM/DD/yyyy');
  };

  return (
    <Card
      className={classes.root}
      onClick={handleOnClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography className={classes.product} component="h2" variant="h5">
            {product.name}
          </Typography>
          <Typography component="body" variant="body1">
            Added {parseDate(product.date)}
          </Typography>
          <Typography component="body" variant="body1">
            Size {product.size} | ${product.price.toFixed(2)}
          </Typography>
          { enlarge &&
            <>
              <Button
                className={classes.buy}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
              >
                Buy now
              </Button>
              <Dialog
                open={open}
                onClose={() => setOpen(false)}
              >
                <DialogTitle>Are you sure you want to buy <br /> {product.name}?</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <Typography component="body" variant="body1">
                      Added {parseDate(product.date)}
                    </Typography>
                    <Typography component="body" variant="body1">
                      Size {product.size}
                    </Typography>
                    <Typography component="body" variant="body1">
                      Price ${product.price.toFixed(2)}
                    </Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>Yes</Button>
                  <Button onClick={() => setOpen(false)}>No</Button>
                </DialogActions>
              </Dialog>
            </>
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;