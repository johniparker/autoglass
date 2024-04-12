from django.core.management.base import BaseCommand
import pandas as pd
import pymysql

class Command(BaseCommand):
    help = 'Initializes the database with predefined data'

    def handle(self, *args, **options):
        conn = pymysql.connect(host='autoglass-db.c0rbu6dmzwzm.us-west-1.rds.amazonaws.com',
                               user='admin',
                               password='data5570',
                               database='Autoglass')

        cursor = conn.cursor()

        # DamageTypes
        query = 'select * from DamageTypes'
        df_dt = pd.read_sql(query, conn, index_col="DamageTypeID")

        # GlassTypes
        query = 'select * from GlassTypes'
        df_gt = pd.read_sql(query, conn, index_col="GlassTypeID")

        # Load data from Excel
        df = pd.read_excel('autoglass.xlsx')

        df['DamageTypeID'] = None
        df['GlassTypeID'] = None
        for index, row in df.iterrows():
            # Find matches in df_dt
            dt_mask = (df_dt['Description'] == row['DamageType']) & (df_dt['RepairType'] == row['RepairType'])
            dt_matching_index = df_dt.index[dt_mask]
            #find matches in df_gt
            gt_mask = (df_gt['Description'] == row['GlassType'])
            gt_matching_index = df_gt.index[gt_mask]
            
            df.at[index, 'DamageTypeID'] = dt_matching_index.item()
            df.at[index, 'GlassTypeID'] = gt_matching_index.item()
        df.drop(['DamageType', 'RepairType', 'GlassType'], axis=1, inplace=True)

        def insert_prep(val):
            try:
                float_val = float(val)
                if float_val.is_integer():
                    return str(int(float_val))
                else:
                    return str(float_val)
            except:
                return f"\'{val}\'"
        
        #get column names from db
        vcols_query = """
        select column_name
        from information_schema.columns
        where table_name = 'Vehicles'
        ;
        """
        
        pcols_query = """
        select column_name
        from information_schema.columns
        where table_name = 'PriceMatrix'
        ;
        """
        
        df_vcols = pd.read_sql(vcols_query, conn)
        vcols = df_vcols['COLUMN_NAME']
        print(vcols)
        
        df_pcols = pd.read_sql(pcols_query, conn)
        df_pcols = df_pcols.drop(df_pcols.index[0])
        pcols = df_pcols['COLUMN_NAME']
        print(pcols)
        
        for index, row in df.iterrows():
            VIN = row['VIN']
            Make = row['Make']
            Model = row['Model']
            Year = row['Year']
            BodyType = row['BodyType']
            GlassTypeID = row['GlassTypeID']
            DamageTypeID = row['DamageTypeID']
            PartNumber = row['PartNumber']
            Price = row['Price']
            
            v_vals = [
                VIN,
                Make,
                Model,
                Year,
                BodyType
            ]
            
            p_vals = [
                VIN,
                GlassTypeID,
                DamageTypeID,
                PartNumber,
                Price
            ]
            
            #process values and insert row
            v_vals_str = ', '.join(insert_prep(i) for i in v_vals)
            vcols_str = ', '.join(vcols)
            
            p_vals_str = ', '.join(insert_prep(i) for i in p_vals)
            pcols_str = ', '.join(pcols)
        
            v_insert = f"""
            insert into Vehicles ({vcols_str})
            values ({v_vals_str})
            ;
            """
            print(v_insert)
            
            p_insert = f"""
            insert into PriceMatrix ({pcols_str})
            values ({p_vals_str})
            ;
            """
            print(p_insert)
            
            cursor.execute(v_insert)
            cursor.execute(p_insert)
        conn.commit()
        cursor.close()
    
    


