using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// collection_cloth 的摘要说明
/// </summary>
public class collection_cloth
{
    DbHelperV2 dbhelperv2 = new DbHelperV2();
    public collection_cloth()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }

    public Result collection_get(int userId)
    {
        var result = new Result<List<Collection>>();
        //此处需优化，参数化处理
        var sqltextFomat = "select a.id, a.userId, clothId, startTime, a.endTime, b.clothName, b.imgUrl from [clothes].[dbo].[collection] as a, [clothes].[dbo].[cloth] as b where a.clothId=b.id";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, userId));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 200;
            result.Message = "没有收藏记录！";
            result.IsTrue = false;
            result.Data = new List<Collection>();
            return result;
        }
        var collections = dt.ToCollections();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = collections;
        result.IsTrue = true;
        return result;
    }

    public Result collection_delete(int id)
    {
        var result = new Result<List<Collection>>();
        //此处需优化，参数化处理
        var sqltextFomat = "delete from [clothes].[dbo].[collection] where id='{0}'";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, id));
        var collections = dt.ToCollections();
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;

    }

    public Result collection_update(string clothId, int id)
    {
        var result = new Result<List<Collection>>();
        //此处需优化，参数化处理
        var sqltextFomat = "update [clothes].[dbo].[collection] set clothId='{0}' where id='{1}'";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, clothId, id));
        
        var collections = dt.ToCollections();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = collections;
        result.IsTrue = true;
        return result;

    }

    public Result collection_insert(string clothId, string startTime, string endTime, string userId)
    {
        var result = new Result<List<Collection>>();
        //此处需优化，参数化处理
        var sqltextFomat = "insert into [clothes].[dbo].[collection] (clothId, startTime, endTime, userId) values ('{0}', '{1}', '{2}', '{3}')";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, clothId, startTime, endTime, userId));
        
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;

    }
}
