import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../common/ProductCard';
import response from './../../constant/response.json';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { IProduct } from '../../interface/Product';
import { Loader } from '../../common/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles((theme: Theme) => 
createStyles({
  root: {
    color: 'white',
    padding: 'calc(25px + 5vmin)',
    textAlign: 'center',
  },
  header: {
  },
  subHeader: {
    color: '#6b6465',
    display: 'block',
    marginBottom: 30,
  },
  sort: {
    '& span': {
      color: 'white',
      cursor: 'pointer',
      selected: {
        color: '#c3989e',
      },
      '&:hover': {
        color: '#c3989e',
      }
    }
  },
  bottom: {
    marginTop: 30,
  },
}),
);

const Home = () => {
  const limit = 50;

  const [data, setData] = useState<IProduct[]>(null);
  const [total, setTotal] = useState(limit);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingMore, setLoadingMore] = useState<boolean>(false);
  const classes = useStyles();

  const sortBySize = () => {
    const temp = response.data.sort((a, b) => b.size - a.size);
    loadData(temp);
  };

  const sortByPrice = () => {
    const temp = response.data.sort((a, b) => b.price - a.price);
    loadData(temp);
  };

  const sortById = () => {
    const temp = response.data.sort((a, b) => a.id - b.id);
    loadData(temp);
    console.log(temp)
  };

  const loadData = (data: IProduct[]) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData(data);
    }, 2000);
  };

  const loadMoreData = () => {
    const newTotal = (total+limit) > response.data.length ? response.data.length : (total+limit);
    setData(data.concat(response.data.slice(total+1, newTotal)));
    setTotal(newTotal);
  };

  const sortBy = (type: string) => {
    if (type === 'size') { sortBySize(); }
    if (type === 'price') { sortByPrice(); }
    if (type === 'id') { sortById(); }
  };

  useEffect(() => {
    loadData(response.data.slice(0, limit));
    setTotal(limit);
    console.log(response.data.length)
  }, []);

  return (
    <div className={classes.root}>
      <Typography className={classes.header} component="h3" variant="h6">
        Select a kaomoji to buy
      </Typography>
      <Typography className={classes.subHeader} component="body" variant="body1">
        click an item to see its actual size
      </Typography>
      <Typography className={classes.subHeader} component="body" variant="body1">
        Sort by
        <div className={classes.sort}>
          <span onClick={() => sortBy('size')}>size</span> -&nbsp;
          <span onClick={() => sortBy('price')}>price</span> -&nbsp;
          <span onClick={() => sortBy('id')}>id</span>
        </div>
      </Typography>
      {
        isLoading ?
        <Loader />
        : data && data.length > 0 ?
          <InfiniteScroll
            dataLength={response.data.length}
            next={() => {
              setTimeout(() => {
                loadMoreData()
              }, 2000)
            }}
            hasMore={total === response.data.length ? false : true}
            loader={<div className={classes.bottom}><Loader /></div>}
            endMessage={
              <div className={classes.bottom}>No more items to load.</div>
            }
            scrollableTarget="scrollableDiv"
            style={{overflow: 'hidden'}}
          >
            <Grid container spacing={3}>
              {data.map((item: IProduct, i: number) => {
                return (
                  <Grid item xs key={i}>
                    <ProductCard data={item} />
                  </Grid>
                )
              })}
            </Grid>
          </InfiniteScroll>
          : 'No items to display. :('
      }
    </div>
  );
};

export default Home;